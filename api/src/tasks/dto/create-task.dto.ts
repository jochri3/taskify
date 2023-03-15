import {ApiProperty} from "@nestjs/swagger";
import { IsInt, IsString} from "class-validator";
import {TaskStatus} from "@prisma/client"

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    title:string

    @ApiProperty({required:false})
    @IsString()
    description?:string

    @ApiProperty()
    @IsString()
    status:TaskStatus

    @ApiProperty()
    @IsInt()
    assignedToId:number

    @ApiProperty()
    @IsString()
    startDate:string

    @ApiProperty()
    @IsString()
    endDate:string
}
