import { Avatar, Button, Chip } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { Preloader } from "../../../../component/preloader"
import { ToastContainer, toast } from "react-toastify"
import { HospitalDao } from "../../../../controller/hospital"
import { useHospitalContext } from "../../../../context/hospital"

export const AdminDeleteHospital=(prop:{children:ReactNode,hospitalId:string})=>{
    const [loading,setLoading]=useState(true);
    const [hospital,setHospital]=useState<any>({});
    const hospitalDao=new HospitalDao().findHospitalById(prop.hospitalId);
    const {refresh}=useHospitalContext();
    useEffect(
        ()=>{
            hospitalDao.then(data=>{setHospital(data.data);setLoading(false)})
        },[prop.hospitalId]
    )
    const deleteHospital=async(e:any)=>{
        e.preventDefault();
     try {
        const hospitalData= await new HospitalDao().deleteHospital(hospital.id);
          hospitalData.status==201?toast.success(hospitalData.data):toast.error(hospitalData.data);
          refresh();
     } catch (error:any) {
        toast.error(error.response.data);
     }
     }
    return<div>
       {prop.children}
       {loading?<Preloader open/>:<>
       {hospital.logo.length!=0&&
       <Avatar src={hospital.logo} className="m-auto mt-2"/>}
        <form className="p-4" onSubmit={deleteHospital}>
       are you sure you want to delete <b>{hospital.name}</b>?
        <div className="modal-footer mt-2">
            <Button type="submit">submit</Button>
        </div>
       </form>
       </>}
       <ToastContainer/>
    </div>
}