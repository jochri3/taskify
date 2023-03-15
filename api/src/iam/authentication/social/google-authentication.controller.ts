import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';
import {AuthType} from "../enums/auth-type.enums";
import {ApiTags} from "@nestjs/swagger";

@Auth(AuthType.None)
@ApiTags("auth/google")
@Controller('auth/google')
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthService: GoogleAuthenticationService,
    ) {}

    @Post()
    authenticate(@Body() tokenDto: GoogleTokenDto) {
        return this.googleAuthService.authenticate(tokenDto.token);
    }
}