import { StudentStatus } from "../../enum/StudentStatus"

export interface IStudent{
     id:string
     name:string
     gender:string
     dateOfBirth:string
     phoneNumber:string
     profilePicture:string
     email:string
     status:StudentStatus
     departmentId:string,
     schoolId:string
}