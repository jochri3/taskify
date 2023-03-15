import {IsEmail, MinLength, IsString, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty()
    @IsString()
    firstName:string

    @ApiProperty()
    lastName:string
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(5)
    password: string;

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    phone?:string
}