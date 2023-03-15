import {IsEmail, IsNumberString, IsOptional, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(5)
    password: string;
}