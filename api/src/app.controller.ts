import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiTags} from "@nestjs/swagger";
import {Auth} from "./iam/authentication/decorators/auth.decorator";
import {AuthType} from "./iam/authentication/enums/auth-type.enums";


@Auth(AuthType.None)
@ApiTags("test")
@Controller("test")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
