import { ReactNode } from "react";
import { JobStatus } from "../../../../enum/jobStatus";
import { Button } from "@mui/material";
import { JobDao } from "../../../../controller/job";
import { toast, ToastContainer } from "react-toastify";
import { useJobContext } from "../../../../context/job";

export const ChangeJobStatus=(prop:{children:ReactNode,jobId:string,status:JobStatus})=>{
    const {refresh}=useJobContext();

    const changeJobStatus=async(e:any)=>{
        e.preventDefault();
        new JobDao().updateHospitalJobStatus(prop.jobId,prop.status).then(
            data=>{console.log(data);
            toast.success(data.data);refresh()}
        ).catch(
            err=>{toast.error(err.request.response);refresh()}
        )
    }
    return <>
    {prop.children}
    <form onSubmit={changeJobStatus}>
        Are you sure you want to {prop.status==JobStatus.CANCELLED?'Cancel':prop.status==JobStatus.OFFER_MADE?'Offer made':'Activate'} this job?
        <div className="modal-footer">
            <Button type="submit" >Yes</Button>
        </div>
        <ToastContainer/>
    </form>
    </>
}