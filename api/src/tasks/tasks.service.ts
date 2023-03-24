import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { PrismaService } from '../prisma/prisma.service';
import {TaskNotFoundException} from "./exceptions/task-not-found.exception";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskDto: CreateTaskDto, activeUser: ActiveUserData) {
    const { startDate, endDate, ...rest } = createTaskDto;
    return this.prisma.task.create({
      data: {
        assignedById: activeUser.sub,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ...rest,
      },
    });
  }

  async findAll(activeUser: ActiveUserData) {
    return this.prisma.task.findMany({
      where: {
        OR: [
          { assignedById: activeUser.sub },
          { assignedToId: activeUser.sub },
        ],
      },
    });
  }


  async findOne(id: number, activeUser: ActiveUserData) {
    const task=await this.prisma.task.findFirst({
      where: {
        id,
        OR: [
          { assignedById: activeUser.sub },
          { assignedToId: activeUser.sub },
        ],
      },
    });
    if(!task){
      throw new TaskNotFoundException(id)
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    activeUser: ActiveUserData,
  ) {
    await this.findOne(id, activeUser);
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  async remove(id: number, activeUser: ActiveUserData) {
    const task = await this.prisma.task.findFirst({
      where: {
        AND: [{ id }, { assignedById: activeUser.sub }],
      },
    });

    if (!task) {
      throw new Error(`Task with it #${id} does not exist`);
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
