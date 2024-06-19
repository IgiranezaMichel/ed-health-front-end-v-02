import { Button, Card, NativeSelect, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { ILocation } from "../../../../interface/entity/location"
import { ToastContainer, toast } from "react-toastify";
import { LocationController } from "../../../../controller/location/location";
import { LocationType } from "../../../../enum/locationtype";
import { useLocationContext } from "../../../../context/location";

export const CreateLocation=(prop:{children:ReactNode})=>{
    const {refresh}=useLocationContext();
    const [location,setLocation]=useState<ILocation>({
        name:'',
        type:LocationType.PROVINCE,
        id:''
    });
    const [province,setProvince]=useState([]);
    const [district,setDistrict]=useState([]);
    const [locationFk,setLocationFk]=useState('');
    const saveLocationHandler =async (e: any) => {
        e.preventDefault();
       const saveLocation=new LocationController().saveLocation(location,locationFk);
       const responseData= (await saveLocation);
       responseData.status==201?toast.success(responseData.data):toast.error(responseData.data)
       refresh()
    };
    const findProvince=()=>{
        const locationController=new LocationController();        
        locationController.getLocationByType().then(data=>{setProvince(data.data);console.log(data.data)
        });
    }
    const getDistrict=(locationId:any)=>{
        const locationController=new LocationController();
        locationController.getListOfLocationFK(locationId).then(data=>setDistrict(data.data));
    }
    useEffect(
        ()=>{},[location.type,province]
    )
    
    return<>
    <Card>
        {prop.children}
       <form onSubmit={saveLocationHandler}>
       <div className="p-2">
        <TextField value={location.name} 
        onChange={(e)=>{
            setLocation({...location,name:e.target.value});
            
            }} placeholder="Location name" className="mb-3" fullWidth/>
        <NativeSelect onChange={(e)=>{
            setLocation({...location,type:e.target.value as LocationType});
            e.target.value!=LocationType.PROVINCE&&findProvince()
            }} className="border p-1 mb-3" fullWidth>
            <option value="">select type</option>
            <option value={LocationType.PROVINCE}>Province</option>
            <option value={LocationType.DISTRICT}>District</option>
            <option value={LocationType.SECTOR}>Sector</option>
        </NativeSelect>
        {province.length!=0&&(location.type==LocationType.DISTRICT||location.type==LocationType.SECTOR)&&
        <>
        <span>Province</span>
        <NativeSelect onChange={(e)=>{getDistrict(e.target.value);location.type==LocationType.DISTRICT&&setLocationFk(e.target.value)}} fullWidth className="p-1 border mb-3">
            <option value="">select province</option>
            {province.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
        </>
        }
        {district.length!=0&&(location.type==LocationType.SECTOR)&&
        <>
        <span>Distict</span>
        <NativeSelect onChange={(e)=>{location.type==LocationType.SECTOR&&setLocationFk(e.target.value)}} fullWidth className="p-1 border mb-3">
            <option value="">Select District</option>
            {district.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
        </>
        }
        <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
        </div>
       </form>
       <ToastContainer/>
    </Card>
    </>
}