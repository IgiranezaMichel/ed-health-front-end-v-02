import { useState } from "react";
import { Role } from "../../../../../enum/Role";
import { IAccountHolder } from "../../../../../interface/entity/accountholder";
import { Avatar, Button, NativeSelect, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { AccountHolderDao } from "../../../../../controller/accountHolder";
import { useAccountHolderContext } from "../../../../../context/accountHolder";

export const SchoolAdminCreateAccount=()=>{
    const [accountHolder,setAccountHolder]=useState<IAccountHolder>({
        id:'',name:'',gender:'',email:'',phoneNumber:'', dob:'', password:'',photo:'',role:Role.ROLE_SCHOOL
    });
    const {update}=useAccountHolderContext();
    const handleImg=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files&&e.target.files[0]){
            const file=e.target.files[0];
            const fileReader=new FileReader();
             if(file.size>4194304){
                toast.error('The file to upload exceed over 4 Mb')
             }
            
            fileReader.onload=()=>{
                setAccountHolder({...accountHolder,photo:fileReader.result as string});
                
            }
            fileReader.readAsDataURL(file);
        }
    }
    const saveAccountHandler=async(e:any)=>{
        e.preventDefault();
        await new AccountHolderDao().saveAccountHolder(accountHolder,'')
        .then(data=>{
            if(data.status==201){
                console.log(accountHolder.email);
                update(accountHolder.email);
                toast.success(data.data);
               }else{     
                toast.error(data.data)
               } 
        }).catch(err=>{
            toast.error(err.request.response);})        
    }
    return <form onSubmit={saveAccountHandler} className="p-2">
    <div>Add new user</div>
    {accountHolder.photo.length!=0&&<Avatar className="m-auto mb-3" src={accountHolder.photo}/>}

    <TextField label='Name'value={accountHolder.name} onChange={e=>setAccountHolder({...accountHolder,name:e.target.value})} fullWidth className="mb-3"/>

    <NativeSelect className="p-2 mb-2 border" onChange={e=>setAccountHolder({...accountHolder,gender:e.target.value})} fullWidth>
        <option value="">select gender</option>
        <option value="Male">Male</option>
        <option value="Male">Female</option>
    </NativeSelect>
    <TextField label='Email'value={accountHolder.email} onChange={e=>setAccountHolder({...accountHolder,email:e.target.value})} fullWidth className="mb-3"/>

    <TextField label='Phone number'value={accountHolder.phoneNumber}  
    onChange={e=>setAccountHolder({...accountHolder,phoneNumber:e.target.value})} fullWidth className="mb-3"/>

    <TextField label='date of birth' type="date" value={accountHolder.dob} onChange={e=>setAccountHolder({...accountHolder,dob:e.target.value})} fullWidth className="mb-3"/>

    Add profile picture
    <input type="file" className="form-control mb-3" onChange={handleImg}/>
       <div className="modal-footer">
       <Button type="submit">Submit</Button>
       </div>
       <ToastContainer/>
    </form>
}