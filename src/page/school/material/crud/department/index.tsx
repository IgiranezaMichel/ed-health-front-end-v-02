import { Box, Button, Dialog, IconButton } from "@mui/material"
import { DisplayDepartment } from "./display"
import { AddCircle, Close } from "@mui/icons-material"
import { useState } from "react"
import { CreateDepartment } from "./create"

export const SchoolDepartmentIndex=()=>{
    const [newSchool,setNewSchool]=useState(false);
    return <>
    <div className="d-flex justify-content-between align-items-center">
    <div className="fw-bolder">Department table</div>
        <Button variant="outlined" onClick={()=>setNewSchool(true)}> <AddCircle/> create</Button>
    </div>
    
    <DisplayDepartment></DisplayDepartment>
    <Dialog open={newSchool} maxWidth='xs' PaperProps={{className:'col-12'}}>
        <CreateDepartment>
            <Box className='d-flex justify-content-between p-2 align-items-center sticky-top bg-white'>
                <div>New Department</div> <IconButton onClick={()=>setNewSchool(false)}><Close/></IconButton>
            </Box>
        </CreateDepartment>
    </Dialog>
    </>
}