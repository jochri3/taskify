import {Task} from "@prisma/client"
import {ApiProperty} from "@nestjs/swagger";

export class TaskEntity implements Partial<Task>{
    @ApiProperty()
    id:number

    @ApiProperty()
    startDate:Date

    @ApiProperty()
    endDate:Date

    @ApiProperty()
    title:string

    @ApiProperty()
    description:string
}
