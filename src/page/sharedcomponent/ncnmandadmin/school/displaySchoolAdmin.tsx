import { Avatar, Box, Card, Chip } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { Person, Phone, Wc } from "@mui/icons-material";
import { ControlPanelDao } from "../../../../controller/controlPanel";

export const DisplaySchoolAdmins=(prop:{children:ReactNode,schoolId:string})=>{
    const schoolDao=new ControlPanelDao().getAllAdminsReferencedByFk(prop.schoolId);
    const [schoolAdminList,setSchoolAdminList]=useState([]);
    useEffect(
        ()=>{
        schoolDao.then(data=>setSchoolAdminList(data.data)).catch(err=>console.log(err))
        },[]
    )
    return <>
    {prop.children}
    <Box sx={{p:1}}>
        {schoolAdminList.map((data:any)=><div>
            <Card key={data.id} className="d-flex p-1 col-sm-6 border rounded-0">
            <Avatar src={data.accountHolderPicture}/> <div className="mx-2">
                <div className="mb-1 small"><Person className="p-1 rounded-circle border border-black mx-1"/>{data.accountHolderName}</div>
                <div className="mb-1 small"><Wc className="p-1 rounded-circle border border-black mx-1"/>{data.accountHolderGender}</div>
                <div className="mb-1 small"><Phone className="p-1 rounded-circle border border-black mx-1"/>{data.accountHolderPhoneNumber}</div>
            </div>
        </Card>
        </div>)}
        {
            schoolAdminList.length==0&&<div className="text-center"><Chip label='No data found'/></div>
        }
    </Box>
    </>
}