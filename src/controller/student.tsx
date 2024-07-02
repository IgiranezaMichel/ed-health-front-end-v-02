import axios from "axios";
import { IStudent } from "../interface/entity/student";
import { IPage } from "../interface/page";
import { StudentStatus } from "../enum/StudentStatus";

const API='http://localhost:8080/api/student';
export class StudentDao{
    public saveStudent=async(student:IStudent)=>{
        return await axios.post(API+'/create',student,{withCredentials:true});
    }
    public getAllStudentFromSameSchool=async(page:IPage,status:StudentStatus)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'&pageSize='+page.pageSize+'&status='+status,{withCredentials:true});
    }
    public deleteStudent=async(StudentId:string)=>{
        return await axios.delete(API+'/'+StudentId,{withCredentials:true});
     }
     public findHospitalById=async(hospitalId:string)=>{
        return await axios.get(API+'/'+hospitalId,{withCredentials:true});
     }
     
    }