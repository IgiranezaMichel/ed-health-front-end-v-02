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
    return 
    
}