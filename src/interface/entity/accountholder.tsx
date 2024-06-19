import { Role } from "../../enum/Role"
 export interface IAccountHolder{
    id:string
    name:string
    gender:string
    email:string
    phoneNumber:string
    photo:string
    dob:string
    password:string
    role:Role
}