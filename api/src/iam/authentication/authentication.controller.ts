import {Body, Controller, HttpCode, HttpStatus, Post, Res,} from '@nestjs/common';
import {SignUpDto} from './dto/sign-up.dto';
import {SignInDto} from './dto/sign-in.dto';
import {AuthenticationService} from './authentication.service';
import {Auth} from "./decorators/auth.decorator";
import {AuthType} from "./enums/auth-type.enums";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {ApiTags} from "@nestjs/swagger";



@Auth(AuthType.None)
@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
  ) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refeshTokens(@Body() refreshTokenDto:RefreshTokenDto){
    return this.authService.refreshTokens(refreshTokenDto)
  }
}
