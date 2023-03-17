import {ApiProperty} from "@nestjs/swagger";

export class SigninResponse{

    @ApiProperty()
    accessToken:string;

    @ApiProperty()
    refreshToken:string;
}