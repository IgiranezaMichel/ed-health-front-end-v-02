import axios from "axios";
import { IDepartment } from "../interface/entity/department";

const API='http://localhost:8080/api/department';
export class DepartmentDao{
    public saveDepartment=async(department:IDepartment)=>{
        return await axios.post(API+'/create',department,{withCredentials:true});
    }
    public updateDepartment=async(department:IDepartment)=>{
        return await axios.post(API+'/update',department,{withCredentials:true});
    }
    public getSchoolDepartments=async()=>{
        return await axios.get(API+'/all',{withCredentials:true});
    }
    public deleteDepartment=async(departmentId:string)=>{
        return await axios.delete(API+'/'+departmentId,{withCredentials:true});
     }
     public findDepartmentById=async(departmentId:string)=>{
        return await axios.get(API+'/'+departmentId,{withCredentials:true});
     }
     public findDepartmentListBelongsInFaculty=async(facultyId:string)=>{
        return await axios.get(API+'/all/department/'+facultyId,{withCredentials:true});
     }
}