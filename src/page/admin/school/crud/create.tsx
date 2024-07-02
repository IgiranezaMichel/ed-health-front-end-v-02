import {LocalHospital, Search} from "@mui/icons-material"
import { Avatar, Box, Button, IconButton, NativeSelect, Step, StepLabel, Stepper, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { SchoolDao } from "../../../../controller/school"
import { ISchool } from "../../../../interface/entity/school"
import { ToastContainer, toast } from "react-toastify"
import { LocationController } from "../../../../controller/location/location"
import { useSchoolContext } from "../../../../context/school"
import { Role } from "../../../../enum/Role"
import { useSchoolAdminContext } from "../../../../context/schoolAdmin"
import { IAccountHolder } from "../../../../interface/entity/accountholder"
import { AccountHolderDao } from "../../../../controller/accountHolder"

export const AdminCreateSchool=(prop:{children:ReactNode})=>{
    const {current}=useSchoolAdminContext();
    
    const schoolContextData=useSchoolContext();
    const [accountHolder,setAccountHolder]=useState<IAccountHolder>({dob:'',email:'',gender:'',id:'',name:'',password:'',phoneNumber:'',photo:'',role:Role.ROLE_SCHOOL});
    const [school,setSchool]=useState<ISchool>({
         location:'',logo:'',name:'',id:'',
         accountHolderDto:accountHolder});
    const steps = [
        'School',
        'School Admin',
      ];
    const [province,setProvince]=useState([]);
    const [district,setDistrict]=useState([]);
    const [emailFound,setEmailFound]=useState(false);
    const [sector,setSector]=useState([]);
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
    const handleImg=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files&&e.target.files[0]){
            const file=e.target.files[0];
            const fileReader=new FileReader();
             if(file.size>4194304){
                toast.error('The file to upload exceed over 4 Mb')
             }
            fileReader.onload=()=>{
                setSchool({...school,accountHolderDto:{...school.accountHolderDto,photo:fileReader.result as string}});
                
            }
            fileReader.readAsDataURL(file);
        }
    }
    const locationDao=new LocationController().getLocationByType();
    useEffect(
        ()=>{
            locationDao.then(data=>{setProvince(data.data);});            
        },[current]
    )
    useEffect(
        ()=>{
            console.log(school);
            
        },[school,accountHolder]
    )
    const handleDistrict=(provinceId:string)=>{
    new LocationController().getListOfLocationFK(provinceId).then(data=>setDistrict(data.data));
    }
    const handleSector=(sectorId:string)=>{
        new LocationController().getListOfLocationFK(sectorId).then(data=>setSector(data.data));
        }
    const next=(e:any)=>{ 
        e.preventDefault();
        setStepper(1)
    }
    const findEmail=async()=>{
        await  new AccountHolderDao().findAccountHolderByEmail(accountHolder.email).then
        (data=>{
            const responseData=data.data;

            setAccountHolder({...accountHolder,photo:responseData.photo});
            responseData.email==null?toast.error('User not found'): toast.success(data.data.name);
            if(responseData.email!=null){
                setEmailFound(true);
                setSchool({...school,accountHolderDto:{...school.accountHolderDto,photo:responseData.photo}});
                setSchool({...school,accountHolderDto:{...school.accountHolderDto,email:responseData.email}})
            }
        }
            
        ).catch(err=>toast.error(err.request.response));
      }
    const saveSchool=(e:any)=>{
        e.preventDefault();
         new SchoolDao().saveSchool(school).then(
            data=>{data.status==201?toast.success(data.data):toast.error(data.data)
                ;schoolContextData.refresh();
            }
        ).catch(err=>{
            console.log(err);
            
            toast.error(err.request.responseText)
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

{stepper==0&&
       <form onSubmit={next} className="p-4">
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
            <Button type="submit">Next</Button>
        </div>}
       </form>
}

{
    stepper==1&&<>
    
    <Box sx={{display:'flex',justifyContent:'space-between',p:3,alignItems:'center',bgcolor:'green',color:'white',m:2}}>
        <>Admin you want to add has account?</><>
        <Button color={userHasAccount=='yes'?"info":"inherit"} variant={userHasAccount=='yes'?'contained':'text'} onClick={()=>setUserAccountHasAccount('yes')}>Yes</Button> 
        <Button color={userHasAccount=='not'?"info":"inherit"} variant={userHasAccount=='no'?'contained':'text'} onClick={()=>setUserAccountHasAccount('no')}>No</Button></>
      </Box>
{userHasAccount.length!=0&&userHasAccount=='no'&&<form onSubmit={saveSchool} className="p-2">
    <div>Add new user</div>
    {school.accountHolderDto.photo.length!=0&&<Avatar className="m-auto mb-3" src={school.accountHolderDto.photo}/>}

    <TextField label='Name'value={school.accountHolderDto.name} onChange={e=>setSchool({...school,accountHolderDto:{...school.accountHolderDto,name:e.target.value}})} fullWidth className="mb-3"/>

    <NativeSelect className="p-2 mb-2 border"  onChange={e=>setSchool({...school,accountHolderDto:{...school.accountHolderDto,gender:e.target.value}})} fullWidth>
        <option value="">select gender</option>
        <option value="Male">Male</option>
        <option value="Male">Female</option>
    </NativeSelect>
    <TextField label='Email'value={school.accountHolderDto.email} onChange={e=>setSchool({...school,accountHolderDto:{...school.accountHolderDto,email:e.target.value}})} fullWidth className="mb-3"/>

    <TextField label='Phone number'value={school.accountHolderDto.phoneNumber} onChange={e=>setSchool({...school,accountHolderDto:{...school.accountHolderDto,phoneNumber:e.target.value}})} fullWidth className="mb-3"/>

    <TextField label='date of birth' InputLabelProps={{shrink:true}} type="date" 
    value={school.accountHolderDto.dob} onChange={e=>setSchool({...school,accountHolderDto:{...school.accountHolderDto,dob:e.target.value}})}
    fullWidth className="mb-3"/>
    Add profile picture
    <input type="file" className="form-control mb-3" onChange={handleImg}/>
       <div className="modal-footer">
       <Button type="submit">Submit</Button>
       </div>
       <ToastContainer/>
</form>}
{userHasAccount.length!=0&&userHasAccount=='yes'&&<form onSubmit={saveSchool} className="p-3">
    {accountHolder.photo.length!=0&&<div className="text-center">
        <Avatar src={accountHolder.photo} className="m-auto mb-4"/>
    </div>}
    <TextField label='Email'value={accountHolder.email}
      onChange={e=>setAccountHolder({...accountHolder,email:e.target.value})}
     InputProps={{endAdornment: 
        <IconButton onClick={()=>findEmail()}>
                <Search/>
        </IconButton>
        }} 
     fullWidth className="mb-3"/>
     {emailFound&&<div className="modal-footer"><Button type="submit" className="">submit</Button></div>}
    </form>}
    </>
}
       <ToastContainer/>
    </div>
}