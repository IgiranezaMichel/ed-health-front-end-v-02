import {  CalendarMonth, Delete, Email, LockPerson, Search } from "@mui/icons-material"
import { Avatar, Box,Chip,Grid,IconButton, NativeSelect, TextField } from "@mui/material"
import { useAccountHolderContext } from "../../../../context/accountHolder"
import { Role } from "../../../../enum/Role";
import { useEffect, useState } from "react";
import { IPage } from "../../../../interface/page";
export const AdminDisplayUser=()=>{
const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'name'});
const {current,update}=useAccountHolderContext();
useEffect(
    ()=>{update(page)},[page]
)
    return <>
    <Grid className="d-flex justify-content-between align-content-center">
           <TextField className="p-0" value={page.search} onChange={e=>setPage({...page,search:e.target.value})} 
           InputProps={{startAdornment:<IconButton>
            <Search/>
            </IconButton>}}
           placeholder="Search .."
           sx={{
            '& .MuiInputBase-root':{
                height:'40px'
            }
           }}
           /> 
           <Box>
            <NativeSelect onChange={e=>{e.target.value.length!=0&&setPage({...page,sort:e.target.value})}} className="p-1 mx-2 border border-2 rounded border-primary-subtle" sx={{}}>
            <option value="" >select role</option>
            <option value={'name'} >name</option>
            <option value={'gender'} >Gender</option>
            <option value={'dob'} >Date of birth</option>
            </NativeSelect>
            
           </Box>
           </Grid>
    <div className="table-responsive-md mt-3 ">
        <table className="table table-striped  table-hover table-borderless table-secondary align-middle overflow-auto">
            <thead className="">
            <tr>
                   <td className="table-light" colSpan={6}> Manage User Table</td>
                </tr>
                <tr>
                    <th className="small">Name</th>
                    <th className="small">Gender</th>
                    <th className="small">Email</th>
                    <th className="small">Date of birth</th>
                    <th className="small">role</th>
                    <th className="small">Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {current!=undefined&&current.content!=undefined&&
                current.content.length!=0&&current.content.map((data:any)=><tr className="">
                    <td className="small">
                        <div className="d-flex align-items-center">
                        <Avatar src={data.photo} sx={{ width: 24, height: 24 }}/> <div className="mx-1">
                            {data.name} </div>
                        </div>
                    </td>
                    <td className="small">{data.gender}</td>
                    <td className="small">
                        <Email className="small"/>{data.email}</td>
                    <td className="small">
                        <CalendarMonth className="small"/>{data.dob}</td>
                    <td >
                        <LockPerson className="small"/>{data.role==Role.ROLE_ADMIN?'School admin':data.role==Role.ROLE_HOSPITAL?'Hospital admin':data.role==Role.ROLE_NCNM?'Ncnm admin':data.role==Role.ROLE_SCHOOL?'School admin':'student'}</td>
                    <td className="small"><Delete className="small"/></td>
                </tr>)}
                {current!=undefined&&current.content!=undefined&&
                current.content.length==0&&<tr><td colSpan={6} className="text-center"><Chip label='No data found'/></td></tr>}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
       </div>
    </>
}