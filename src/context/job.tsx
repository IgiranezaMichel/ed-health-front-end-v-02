import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { JobDao } from "../controller/job";
import { JobStatus } from "../enum/jobStatus";

const JobContext=createContext<IState|undefined>(undefined);
export const useJobContext=()=>{
const Job=useContext(JobContext);
if(!Job)throw Error('Job is undefined')
return Job;
}
export const HospitalJobProvider=(prop:{children:ReactNode})=>{
    const [jobList,setJobList]=useState([]);
    const [refresh,setRefresh]=useState(false);
    const [jobStatus,setJobStatus]=useState(JobStatus.OPEN);
    useEffect(
        ()=>{
            new JobDao().getAllHospitalJob(jobStatus).then(data=>{setJobList(data.data);
            }).then(err=>console.log(err))
        },[refresh,jobStatus]
    )
    const data:IState={
        current:jobList,
        refresh:()=>setRefresh(!refresh),
        update:(data:JobStatus)=>setJobStatus(data)
    }
    return <JobContext.Provider value={data}>
    {prop.children}
    </JobContext.Provider>
}