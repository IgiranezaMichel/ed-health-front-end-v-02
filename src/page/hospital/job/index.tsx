import { Button, Dialog, IconButton } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { HospitalMenu } from "../../../utils/hospitalMenu"
import { DisplayJob } from "./crud/display"
import { CreateJob } from "./crud/create"
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { HospitalJobProvider } from "../../../context/job"

export const HospitalJobs=()=>{
    const [addNewJob,setAddNewJob]=useState(false);
    return <Navigation navItems={HospitalMenu}>
        <HospitalJobProvider>
        <div className="d-flex align-items-center justify-content-between">
        <div className="fs-5 fw-bolder mt-3 mb-2">Vacancy Job</div>
        <Button onClick={()=>setAddNewJob(true)}>create</Button>
        </div>
        <DisplayJob/>
        <Dialog maxWidth='sm' open={addNewJob} PaperProps={{className:'col-12 rorunded-0'}}>
            <CreateJob>
                <div className="d-flex align-items-center justify-content-between p-2 sticky-top bg-white">
                    <div>Add New Job</div><IconButton onClick={()=>setAddNewJob(false)}><Close/></IconButton>
                </div>
            </CreateJob>
        </Dialog>
        </HospitalJobProvider>
    </Navigation>
}