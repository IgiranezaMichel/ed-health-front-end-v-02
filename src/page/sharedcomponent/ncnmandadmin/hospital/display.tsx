import { Avatar, Chip, Dialog, IconButton } from "@mui/material"
import { useHospitalContext } from "../../../../context/hospital"
import {  Close, DeleteForever, LocalHospitalOutlined, LocationOn } from "@mui/icons-material";
import { AdminDeleteHospital } from "../../../admin/hospital/crud/delete";
import { useState } from "react";
export const DisplayHospitals=()=>{
    const {current}=useHospitalContext();
    const [deleteHospital,setDeleteHospital]=useState(false);
    const [HospitalId,setHospitalId]=useState('');    
    return <>
    <div className="table-responsive-md mt-3">
        <table className="table table-striped table-hover table-borderless  align-middle">
            <thead className="">
            <tr>
                   <td className="table-white p-0 pt-2 pb-3 fw-bolder" colSpan={6}> Manage Hospital Table</td>
                </tr>
                <tr className="table-primary">
                    <th className="small">Name</th>
                    <th className="small">Location</th>
                    <th className="small">Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider ">
                {current!=undefined&&current.content!=undefined&&current.content.length!=0&&current.content.map((data:any)=><tr key={data.id} className="">
                    <td className="small">
                        <div className="d-flex align-items-center">
                        <Avatar src={data.logo} sx={{ width: 24, height: 24 }}/> <div className="mx-1">{data.name} </div>
                        </div>
                    </td>
                    <td className="small"><LocationOn/> {data.province} || {data.district} || {data.sector}</td>
                    <td className="small">
                        <IconButton onClick={()=>{setHospitalId(data.id);setDeleteHospital(true)}}><DeleteForever/></IconButton>
                    </td>
                   </tr>) }
                   {current!=undefined&&current.content!=undefined&&current.content.length==0&&
                   <tr className="text-center">
                    <td colSpan={3}><Chip label='No hospital data found' className="m-auto"/></td>
                    </tr>}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        <Dialog open={deleteHospital}>
           <AdminDeleteHospital hospitalId={HospitalId}>
           <div className="d-flex justify-content-between p-2 bg-success sticky-top text-white">
                <div><LocalHospitalOutlined/> Remove Hospital</div> <div><Close onClick={()=>setDeleteHospital(false)}/></div>
            </div>
           </AdminDeleteHospital>
        </Dialog>
       </div>
    </>
}