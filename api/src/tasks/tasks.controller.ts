import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { TaskEntity } from './entities/task.entity';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.tasksService.create(createTaskDto, activeUser);
  }

  @Get()
  @ApiOkResponse({ type: [TaskEntity] })
  findAll(@ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.findAll(activeUser);
  }

  // @Get(':id')
  // @ApiOkResponse({ type: TaskEntity })
  // async findOne(
  //   @Param('id') id: string,
  //   @ActiveUser() activeUser: ActiveUserData,
  // ) {
  //   try {
  //   return await this.tasksService.findOne(+id, activeUser);
  //   } catch (e) {
  //     throw new NotFoundException();
  //   }
  // }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  async findOne(
    @Param('id') id: string,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    const task = await this.tasksService.findOne(+id, activeUser);
    if (!task) {
      throw new NotFoundException(`Task with id #${id} doesn't exist.`);
    }
    return task;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TaskEntity })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    try {
      return await this.tasksService.update(+id, updateTaskDto, activeUser);
    } catch (e) {
      console.error('Erreur : ', e);
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: TaskEntity })
  remove(@Param('id') id: string, @ActiveUser() activeUser: ActiveUserData) {
    return this.tasksService.remove(+id, activeUser);
  }
}
