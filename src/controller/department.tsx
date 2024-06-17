import axios from "axios";
import { IDepartment } from "../interface/entity/department";

const API='http://localhost:8080/api/department';
export class DepartmentDao{
    private schoolId:string='3bd1351c-7a7d-4c55-989a-63efdae28275'
    public saveDepartment=async(department:IDepartment)=>{
        return await axios.post(API+'/create',department,{withCredentials:true});
    }
    public updateDepartment=async(department:IDepartment)=>{
        return await axios.post(API+'/update',department,{withCredentials:true});
    }
    public getSchoolDepartments=async(schoolId:string)=>{
        if(schoolId.length==0)schoolId=this.schoolId
        return await axios.get(API+'/all/'+schoolId,{withCredentials:true});
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