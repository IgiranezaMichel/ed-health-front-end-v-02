import { Avatar, Chip, Dialog, Fade, IconButton } from "@mui/material"
import { useSchoolContext } from "../../../../context/school"
import {Close, Grading, LockPersonSharp } from "@mui/icons-material";
import { DisplaySchoolAdmins } from "./displaySchoolAdmin";
import { useState } from "react";
import { SchoolDetailIndex } from "../../../ncnm/school/crud/display";
export const AdminDisplaySchool=()=>{
    const {current}=useSchoolContext();
    const [showSchoolAdmins,setShowSchoolAdmins]=useState(false);
    const [schoolId,setSchoolId]=useState('');
    const [showSchoolDetail,setShowSchoolDetail]=useState(false)
    return <>
    <div className="table-responsive-md mt-3">
        <table className="table table-striped table-hover table-borderless table-secondary align-middle">
            <thead className="">
            <tr>
                   <td className="table-light" colSpan={6}> Manage School Table</td>
                </tr>
                <tr>
                    <th className="small">Name</th>
                    <th className="small">Location</th>
                    <th className="small text-center">Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {current!=undefined&&current.content!=undefined&&current.content.length!=0&&current.content.map(
                    (data:any)=><tr className="" key={data.id}>
                    <td className="small">
                        <div className="d-flex align-items-center">
                        <Avatar src={data.logo} sx={{ width: 24, height: 24 }}/> <div className="mx-1">{data.name} </div>
                        </div>
                    </td>
                    <td className="small">{data.province} || {data.distict} || {data.sector}</td>
                    <td className="small text-center">
                        <IconButton className="bg-primary small p-0 me-2" onClick={()=>{setSchoolId(data.id);setShowSchoolAdmins(true)}}>
                        <LockPersonSharp className="p-1 text-white"/>
                        </IconButton>
                        <IconButton  className="bg-black p-0" onClick={()=>{setSchoolId(data.id);setShowSchoolDetail(true)}}>
                        <Grading className="p-1 text-white"/>
                        </IconButton>
                    </td>
                   </tr>
                ) }
                {current!=undefined&&current.content!=undefined&&current.content.length==0&&<tr>
                    <td colSpan={3} className="text-center"><Chip label='No data found'/></td>
                </tr>}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <Dialog maxWidth='sm' PaperProps={{className:'col-12'}} TransitionComponent={Fade} open={showSchoolAdmins} className="rounded-0 p-2">
            <DisplaySchoolAdmins schoolId={schoolId}>
                <section className="d-flex align-items-center justify-content-between sticky-top p-2 bg-white">
                <div className="fw-bolder">School Admins</div><IconButton onClick={()=>setShowSchoolAdmins(false)}><Close/></IconButton>
                </section>
            </DisplaySchoolAdmins>
        </Dialog>
        <Dialog open={showSchoolDetail} sx={{mx:{md:'100px',width:'100%',height:'100dvh'}}} PaperProps={{className:'col-12'}} maxWidth='md'>
            <SchoolDetailIndex  schoolId={schoolId}>
            <section className="d-flex align-items-center justify-content-between sticky-top p-2 bg-white">
                <div className="fw-bolder">School Detail</div><IconButton onClick={()=>setShowSchoolDetail(false)}><Close/></IconButton>
                </section>
            </SchoolDetailIndex>
        </Dialog>
       </div>
    </>
}