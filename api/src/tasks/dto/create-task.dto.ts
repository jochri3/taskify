import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  status: TaskStatus;

  @ApiProperty()
  @IsInt()
  assignedToId: number;

  @ApiProperty()
  @IsNotEmpty()
  // @Transform(({value})=>new Date(value))
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  endDate: string;
}
