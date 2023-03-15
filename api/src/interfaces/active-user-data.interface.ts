import {Roles} from "@prisma/client"

export interface ActiveUserData{
    role: Roles;
    sub:number;
    email:string;
}