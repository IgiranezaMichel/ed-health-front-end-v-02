import { Edit } from "@mui/icons-material"
import { Button, IconButton, TextField } from "@mui/material"
import { ReactNode, useState } from "react"
import JoditEditor from 'jodit-react'
import { IJob } from "../../../../interface/entity/job"
import { JobDao } from "../../../../controller/job"
import { toast, ToastContainer } from "react-toastify"
import { useJobContext } from "../../../../context/job"
export const CreateJob=(prop:{children:ReactNode})=>{
    const [job,setJob]=useState<IJob>({
        title:'',description:'',deadline:'',numberOfEmployee:0,position:''
    })
    const {refresh}=useJobContext();
    const createJob=async(e:any)=>{
        e.preventDefault();
       await new JobDao().saveJob(job)
        .then(data=>{toast.success(data.data);refresh()})
        .catch(err=>toast.error(err.request.response))
    }
    return<>
    {prop.children}
    <form onSubmit={createJob} className="p-2">
        <div className="text-center fw-bolder mb-3">
            New Job
        </div>
        <TextField value={job.title} onChange={e=>setJob({...job,title:e.target.value})}
         placeholder="job title" className="mb-4" fullWidth InputProps={{endAdornment:<IconButton><Edit/></IconButton>}}/>

        <TextField  value={job.position} onChange={e=>setJob({...job,position:e.target.value})} placeholder="job position" className="mb-4" fullWidth 
        InputProps={{endAdornment:<IconButton><Edit/></IconButton>}}/>

<TextField  type='number' onChange={e=>setJob({...job,numberOfEmployee:Number(e.target.value)})} placeholder="job position" className="mb-4" fullWidth 
        InputProps={{endAdornment:<IconButton><Edit/></IconButton>}}/>

        <i className="fw-bolder">Job description</i>
        <JoditEditor onChange={(value)=>setJob({...job,description:value})} value={job.description}className="mb-3"/>
        <TextField type="date" value={job.deadline} onChange={e=>setJob({...job,deadline:e.target.value})} label='Deadline' InputLabelProps={{shrink:true}} className="mb-3" fullWidth/>
        <div className="modal-footer">
            <Button type='submit'>submit</Button>
        </div>
        <ToastContainer/>
    </form>
    </>
}