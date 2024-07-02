import { Box, Button, Dialog, IconButton } from "@mui/material"
import { DisplayFaculty } from "./display"
import { AddCircle, Close } from "@mui/icons-material"
import { CreateFaculty } from "./create"
import { useState } from "react"
import { FacultyProvider } from "../../../../../context/faculty"

export const SchoolFacultyIndex=()=>{
    const[newFaculty,setNewFaculty]=useState(false);
    return<>
    <FacultyProvider>
    <div className="d-flex justify-content-between align-items-center">
        <div className="fw-bolder">Faculty table</div>
        <Button variant="outlined" onClick={()=>setNewFaculty(true)}> <AddCircle/> create</Button>
    </div>
    
    <DisplayFaculty/>
    
    <Dialog open={newFaculty} maxWidth='xs' PaperProps={{className:'col-12'}}>
        <CreateFaculty>
            <Box className='d-flex justify-content-between p-2 align-items-center sticky-top bg-white'>
                <div>New Faculty</div> <IconButton onClick={()=>setNewFaculty(false)}><Close/></IconButton>
            </Box>
        </CreateFaculty>
    </Dialog>
    </FacultyProvider>
    </>
}