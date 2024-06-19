import {LocalHospital} from "@mui/icons-material"
import { Avatar, Button, Chip, NativeSelect, TextField } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { IHospital } from "../../../../interface/entity/hospital"
import { LocationController } from "../../../../controller/location/location"
import { Preloader } from "../../../../component/preloader"
import { ToastContainer, toast } from "react-toastify"
import { HospitalDao } from "../../../../controller/hospital"
import { useHospitalContext } from "../../../../context/hospital"

export const AdminCreateHospital=(prop:{children:ReactNode})=>{
    const [province,setProvince]=useState([]);
    const [district,setDistrict]=useState([]);
    const [sector,setSector]=useState([]);
    const [loading,setLoading]=useState(true);
    const locationDao=new LocationController().getLocationByType();
    const {refresh}=useHospitalContext();
    const [hospital,setHospital]=useState<IHospital>({
        location:'',
        logo:'',
        name:''
    })
    useEffect(
        ()=>{
            locationDao.then(data=>{setProvince(data.data);setLoading(false)})
        },[]
    )
    const handleDistrict=(provinceId:string)=>{
    new LocationController().getListOfLocationFK(provinceId).then(data=>setDistrict(data.data));
    }
    const handleSector=(sectorId:string)=>{
        new LocationController().getListOfLocationFK(sectorId).then(data=>setSector(data.data));
        }
    const handleLogo=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files&&e.target.files[0]){
            const file=e.target.files[0];
            const fileReader=new FileReader();
             if(file.size>4194304){
                toast.error('The file to upload exceed over 4 Mb')
             }
            
            fileReader.onload=()=>{
                setHospital({...hospital,logo:fileReader.result as string});
                
            }
            fileReader.readAsDataURL(file);
        }
    }
    const saveHospital=async(e:any)=>{
        e.preventDefault();
     try {
        const hospitalData= await new HospitalDao().saveHospital(hospital);
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
        {province.length!=0?
        <form className="p-4" onSubmit={saveHospital}>
        <TextField onChange={(e)=>setHospital({...hospital,name:e.target.value})} fullWidth placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<LocalHospital/>}}/>
        <span>Logo</span>
        <input onChange={handleLogo} type="file" className="border mb-3 form-control"/>
         province
        <NativeSelect onChange={(e)=>handleDistrict(e.target.value)} className="mb-3 border p-1" fullWidth>
            <option value="">select district</option>
        {
            province!=undefined&&province.map((data:any)=><option value={data.id}>{data.name}</option>)
        }
        </NativeSelect>
        {
            district.length!=0&&<>
            District
            <NativeSelect onChange={(e)=>handleSector(e.target.value)} className="mb-3 border p-1" fullWidth>
                <option value="">select district</option>
                {district.map((data:any)=><option value={data.id}>{data.name}</option>)}
            </NativeSelect>
            </>
        }
        {
            sector.length!=0&&<>
            Sector
            <NativeSelect onChange={(e)=>setHospital({...hospital,location:e.target.value})} className="mb-3 border p-1" fullWidth>
                <option value="">select Sector</option>
                {sector.map((data:any)=><option value={data.id}>{data.name}</option>)}
            </NativeSelect>
            </>
        }
       {hospital.location.length!=0&& <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
        }
       </form>:<div className="text-center p-2"><Chip color="warning" label='Please add location before proceed'/></div>
       
    }
       </>}
       <ToastContainer/>
    </div>
}