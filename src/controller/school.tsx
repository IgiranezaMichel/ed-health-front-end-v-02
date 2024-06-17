import axios from "axios";
import { ISchool } from "../interface/entity/school";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/school';
export class SchoolDao{
    public saveSchool=async(school:ISchool,accountHolderEmail:string)=>{
        return await axios.post(API+'/create/'+accountHolderEmail,school,{withCredentials:true});
    }
    public updateSchool=async(school:ISchool)=>{
        return await axios.post(API+'/update',school,{withCredentials:true});
    }
    public getAllSchool=async(page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'pageSize='+page.pageSize,{withCredentials:true});
    }
    public deleteSchool=async(schoolId:string)=>{
        return await axios.delete(API+'/'+schoolId,{withCredentials:true});
     }
     public findHospitalById=async(hospitalId:string)=>{
        return await axios.get(API+'/'+hospitalId,{withCredentials:true});
     }
     
    }
