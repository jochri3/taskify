import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ActiveUserData} from "../interfaces/active-user-data.interface";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prisma:PrismaService) {
  }
  create(createTaskDto: CreateTaskDto,activeUser:ActiveUserData) {
    return this.prisma.task.create({
      data:{
        assignedById:activeUser.sub,
        ...createTaskDto
      }
    })
  }

  async findAll(activeUser:ActiveUserData) {
    return this.prisma.task.findMany({
      where:{
        AND:[
          {assignedById:activeUser.sub},
          {assignedToId:activeUser.sub}
        ]
      }
    });
  }

  findOne(id: number,activeUser:ActiveUserData) {
    return this.prisma.task.findFirstOrThrow({
      where:{
          id,
        OR:[
          {assignedById:activeUser.sub},
          {assignedToId:activeUser.sub}
        ]
      }
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto,activeUser:ActiveUserData) {
    await this.findOne(id,activeUser)

    return this.prisma.user.update({
      where:{
        id
      },
      data:{...updateTaskDto}
    })
  }

  async remove(id: number,activeUser:ActiveUserData) {
    const task=await this.prisma.task.findFirst({
      where:{
        AND: [
          {id},
          {assignedById:activeUser.sub}
        ]
      }
    });

    if(!task){
      throw new Error(`Task with it #${id} does not exist`)
    }

    return this.prisma.task.delete({
      where:{
        id
      }
    })
  }
}