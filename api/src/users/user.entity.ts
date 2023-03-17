import {User,Roles} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";


export class UserEntity implements  Partial<User>{
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Roles;

  @ApiProperty()
  googleId:string
}
