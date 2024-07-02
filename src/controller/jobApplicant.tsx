import axios from "axios";
import { IPage } from "../interface/page";
import { IJobApplicant } from "../interface/entity/jobappicant";
import { JobApplicantStatus } from "../enum/jobapplicantstatus";
const API='http://localhost:8080/api/job-applicant';
export class JobApplicantDao{
    public saveJobApplicant=async(JobApplicant:IJobApplicant)=>{
        return await axios.post(API+'/create',JobApplicant,{withCredentials:true});
    }
    // hospital
    public updateJobApplicantStatus=async(jobApplicantId:string,status:JobApplicantStatus)=>{
        return await axios.post(API+'/status/update'+"?jobApplicantId="+jobApplicantId+"?status="+status,{},{withCredentials:true});
    }
    // hospital
    public getAllJobApplicantByStatus=async(page:IPage,jobId:string,status:JobApplicantStatus)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'&pageSize='+page.pageSize+'&jobId='+jobId+'&status='+status,{withCredentials:true});
    }

    public deleteJobApplicant=async(JobApplicantId:string)=>{
        return await axios.delete(API+'/'+JobApplicantId,{withCredentials:true});
     }
     public findJobApplicantById=async(JobApplicantId:string)=>{
        return await axios.get(API+'/'+JobApplicantId,{withCredentials:true});
     }
     
    }