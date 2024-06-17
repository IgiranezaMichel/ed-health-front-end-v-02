import axios from "axios";
import { IFaculty } from "../interface/entity/faculty";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/faculty';

export class FacultyDao{
    private schoolId:string='3bd1351c-7a7d-4c55-989a-63efdae28275'
    public saveFaculty=async(faculty:IFaculty)=>{
        faculty.schoolId=this.schoolId;
        return await axios.post(API+'/create',faculty,{withCredentials:true});
    }
    public updateFaculty=async(faculty:IFaculty)=>{
        return await axios.post(API+'/update',faculty,{withCredentials:true});
    }
    public getAllFaculty=async(schoolId:string,page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&schoolId='+schoolId+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'pageSize='+page.pageSize,{withCredentials:true});
    }
    public deleteFaculty=async(facultyId:string)=>{
        return await axios.delete(API+'/'+facultyId,{withCredentials:true});
     }
     public findFacultyById=async(facultyId:string)=>{
        return await axios.get(API+'/'+facultyId,{withCredentials:true});
     }
     public getAllFacultyFromSchool=async(schoolId:string)=>{
        schoolId==''? schoolId=this.schoolId:schoolId;
        return await axios.get(API+'/school?schoolId='+schoolId,{withCredentials:true});
     }
     
}