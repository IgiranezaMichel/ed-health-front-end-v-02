import axios from "axios";
import { IJob } from "../interface/entity/job";
import { IPage } from "../interface/page";
import { JobStatus } from "../enum/jobStatus";
const API='http://localhost:8080/api/job';
export class JobDao{
    public saveJob=async(job:IJob)=>{
        return await axios.post(API+'/create',job,{withCredentials:true});
    }
    public updateJob=async(job:IJob)=>{
        return await axios.post(API+'/update',job,{withCredentials:true});
    }
    // student
    public getAllJob=async(page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'&pageSize='+page.pageSize,{withCredentials:true});
    }
    // only hospital admin has right to access this data
    public getAllHospitalJob=async(jobStatus:JobStatus)=>{
        return await axios.get(API+'/hospital/all?jobStatus='+jobStatus,{withCredentials:true});
    }
 
     public updateHospitalJobStatus=async(JobId:string,status:JobStatus)=>{
        return await axios.get(API+'/status/update?jobId='+JobId+'&status='+status,{withCredentials:true});
     }
     
    }