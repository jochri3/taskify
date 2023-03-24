import {NotFoundException} from "@nestjs/common";

export class TaskNotFoundException extends NotFoundException{
    constructor(id:number|string) {
        super(`Task with id ${id} is not found`);
    }
}