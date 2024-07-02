import axios from "axios";
import { IFaculty } from "../interface/entity/faculty";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/faculty';

export class FacultyDao{
    public saveFaculty=async(faculty:IFaculty)=>{
        return await axios.post(API+'/create',faculty,{withCredentials:true});
    }
    public updateFaculty=async(faculty:IFaculty)=>{
        return await axios.post(API+'/update',faculty,{withCredentials:true});
    }
    public getAllFaculty=async(page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'pageSize='+page.pageSize,{withCredentials:true});
    }
    public deleteFaculty=async(facultyId:string)=>{
        return await axios.delete(API+'/'+facultyId,{withCredentials:true});
     }
     public findFacultyById=async(facultyId:string)=>{
        return await axios.get(API+'/'+facultyId,{withCredentials:true});
     }
     public getAllFacultyFromSchool=async()=>{
        return await axios.get(API+'/school',{withCredentials:true});
     }
     
}