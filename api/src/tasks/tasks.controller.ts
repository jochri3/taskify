import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiTags} from "@nestjs/swagger";
import {ActiveUserData} from "../interfaces/active-user-data.interface";
import {ActiveUser} from "../iam/decorators/active-user.decorator";

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto,@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.create(createTaskDto,activeUser);
  }

  @Get()
  findAll(@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.findAll(activeUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.findOne(+id,activeUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.update(+id, updateTaskDto,activeUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.remove(+id,activeUser);
  }
}
