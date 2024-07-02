import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { JobApplicantDao } from "../controller/jobApplicant";
import { IPage } from "../interface/page";
import { JobApplicantStatus } from "../enum/jobapplicantstatus";
const JobApplicantContext=createContext<IState|undefined>(undefined);

export const useJobApplicantContext=()=>{
const JobApplicant=useContext(JobApplicantContext);
if(!JobApplicant)throw Error('JobApplicant is undefined')
return JobApplicant;
}

export const JobApplicantProvider=(prop:{children:ReactNode,jobId:string,status:JobApplicantStatus})=>{
    const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,sort:'timeStamp',search:''});
    const [JobApplicantList,setJobApplicantList]=useState([]);
    const [refresh,setRefresh]=useState(false);
    useEffect(
        ()=>{
            new JobApplicantDao().getAllJobApplicantByStatus(page,prop.jobId,prop.status).then(data=>{setJobApplicantList(data.data);
            }).then(err=>console.log(err))
        },[refresh,prop.jobId,prop.status]
    )
    const data:IState={
        current:JobApplicantList,
        refresh:()=>setRefresh(!refresh),
        update:(data)=>setPage(data)
    }
    return <JobApplicantContext.Provider value={data}>
    {prop.children}
    </JobApplicantContext.Provider>
}