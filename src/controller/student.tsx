import axios from "axios";
import { IStudent } from "../interface/entity/student";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/student';
export class StudentDao{
    private schoolId:string='3bd1351c-7a7d-4c55-989a-63efdae28275'
    public saveStudent=async(student:IStudent)=>{
        return await axios.post(API+'/create',student,{withCredentials:true});
    }
    public getAllStudentFromSameSchool=async(schoolId:string,page:IPage)=>{
        if(schoolId.length==0)schoolId=this.schoolId
        return await axios.get(API+'/all?schoolId='+schoolId+'&search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'pageSize='+page.pageSize,{withCredentials:true});
    }
    public deleteStudent=async(StudentId:string)=>{
        return await axios.delete(API+'/'+StudentId,{withCredentials:true});
     }
     public findHospitalById=async(hospitalId:string)=>{
        return await axios.get(API+'/'+hospitalId,{withCredentials:true});
     }
     
    }