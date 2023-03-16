import {ConflictException, Inject, Injectable, UnauthorizedException,} from '@nestjs/common';
import {SignUpDto} from './dto/sign-up.dto';
import {SignInDto} from './dto/sign-in.dto';
import {HashingService} from '../hashing/hashing.service';
import {JwtService} from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import {ConfigType} from '@nestjs/config';
import {ActiveUserData} from '../../interfaces/active-user-data.interface';
import {InvalidatedRefreshTokenError, RefreshTokenIdsStorage,} from './refresh-token-ids.storage';
import {randomUUID} from 'crypto';
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {PrismaService} from "../../prisma/prisma.service";
import {User} from "@prisma/client"





@Injectable()
export class AuthenticationService {
  constructor(
      private readonly prisma:PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {

      const hash = await this.hashingService.hash(signUpDto.password);
      return await this.prisma.user.create({
        data: {
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          password: hash
        },
        select:{
          id:true,
          firstName: true,
          lastName: true,
          email:true
        }
      });
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where:{
        email: signInDto.email,
      }
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }
    return await this.generateTokens(user);
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.prisma.user.findFirstOrThrow({
        where:{
          id: sub,
        }
      });
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role},
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }
}
