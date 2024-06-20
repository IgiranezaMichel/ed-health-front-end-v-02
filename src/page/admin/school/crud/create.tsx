import {LocalHospital} from "@mui/icons-material"
import { Avatar, Box, Button, NativeSelect, Step, StepLabel, Stepper, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { SchoolDao } from "../../../../controller/school"
import { ISchool } from "../../../../interface/entity/school"
import { ToastContainer, toast } from "react-toastify"
import { LocationController } from "../../../../controller/location/location"
import { SchoolAdminHasAccount } from "./schoolAdmin/hasAccount"
import { useAccountHolderContext } from "../../../../context/accountHolder"
import { SchoolAdminCreateAccount } from "./schoolAdmin/createAccount"
import { useSchoolContext } from "../../../../context/school"

export const AdminCreateSchool=(prop:{children:ReactNode})=>{
    const {current}=useAccountHolderContext();
    const schoolContectData=useSchoolContext();
    const [school,setSchool]=useState<ISchool>({
         location:'',logo:'',name:'',id:''});
    const steps = [
        'School',
        'School Admin',
      ];
    const [province,setProvince]=useState([]);
    const [district,setDistrict]=useState([]);
    const [sector,setSector]=useState([]);
    const [email,setEmail]=useState('');
    const [stepper,setStepper]=useState(0);
    const handleLogo=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files&&e.target.files[0]){
            const file=e.target.files[0];
            const fileReader=new FileReader();
             if(file.size>4194304){
                toast.error('The file to upload exceed over 4 Mb')
             }
            fileReader.onload=()=>{
                setSchool({...school,logo:fileReader.result as string});                
            }
            fileReader.readAsDataURL(file);
        }
    }
    const locationDao=new LocationController().getLocationByType();
    useEffect(
        ()=>{
            locationDao.then(data=>{setProvince(data.data);});            
            current!=undefined&&current.length!=0&&setStepper(1);
            console.log(current);
            setEmail(current);
            
        },[current]
    )
    const handleDistrict=(provinceId:string)=>{
    new LocationController().getListOfLocationFK(provinceId).then(data=>setDistrict(data.data));
    }
    const handleSector=(sectorId:string)=>{
        new LocationController().getListOfLocationFK(sectorId).then(data=>setSector(data.data));
        }
    const saveSchool=(e:any)=>{
        e.preventDefault();
         new SchoolDao().saveSchool(school,email).then(
            data=>{data.status==201?toast.success(data.data):toast.error(data.data);schoolContectData.refresh();
            }
        ).catch(err=>{
            console.log(err);
            
            toast.error(err.message)
        })
    }
    const [userHasAccount,setUserAccountHasAccount]=useState('')
    return<div>
       {prop.children}
       <Stepper className="mt-3" activeStep={stepper} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{display:'flex',justifyContent:'space-between',p:3,alignItems:'center',bgcolor:'green',color:'white',m:2}}>
        <>Admin you want to add has account?</><><Button color={userHasAccount=='yes'?"info":"inherit"} variant={userHasAccount=='yes'?'contained':'text'} onClick={()=>setUserAccountHasAccount('yes')}>Yes</Button> 
        <Button color={userHasAccount=='not'?"info":"inherit"} variant={userHasAccount=='no'?'contained':'text'} onClick={()=>setUserAccountHasAccount('no')}>No</Button></>
      </Box>

      {current.length==0&&<>
      {userHasAccount=='yes'?<SchoolAdminHasAccount/>:userHasAccount=='no'?<SchoolAdminCreateAccount/>:''}
      </>}
       {stepper==1&&
       <form onSubmit={saveSchool} className="p-4">
        <div className="mb-3">
            <Avatar className="m-auto" src={school.logo}/>
        </div>
        <TextField required fullWidth value={school.name} onChange={e=>setSchool({...school,name:e.target.value})} placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<LocalHospital/>}}/>
        <div className="mb-3">Log</div>
        <input required onChange={handleLogo} type="file" className="col-12 mb-3 form-control" />
        select province
        <NativeSelect required onChange={(e)=>handleDistrict(e.target.value)} className="mb-3 border p-1" fullWidth>
            <option value="">select district</option>
           {province.length!=0&&province.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
        {district.length!=0&&
            <div>
             select distict
        <NativeSelect required onChange={(e)=>handleSector(e.target.value)} className="mb-3 border p-1" fullWidth>
            <option value="">select Distict</option>
            {district.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
            </div>
        }
          {sector.length!=0&&
            <div>
             Sector
        <NativeSelect required onChange={(e)=>setSchool({...school,location:e.target.value})} className="mb-3 border p-1" fullWidth>
            <option value="">select Sector</option>
            {sector.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
            </div>
        }
        {school.location.length!=0&&<div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>}
       </form>}
       <ToastContainer/>
    </div>
}