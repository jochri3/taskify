import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class GoogleTokenDto {
    @ApiProperty()
    @IsNotEmpty()
    token: string;
}