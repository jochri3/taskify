import {User,Roles} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";


export class UserEntity implements  User{
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Roles;

  @ApiProperty()
  googleId:string

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
