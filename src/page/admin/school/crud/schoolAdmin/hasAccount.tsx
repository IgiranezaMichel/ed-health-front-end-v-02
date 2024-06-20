import { Search} from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { AccountHolderDao } from "../../../../../controller/accountHolder";
import { ToastContainer, toast } from "react-toastify";
import { useAccountHolderContext } from "../../../../../context/accountHolder";

export const SchoolAdminHasAccount=()=>{
    const [email,setEmail]=useState('');
    const {update}=useAccountHolderContext();
    useEffect(
        ()=>{},[]
    )
    const findEmail=async()=>{
      const responseData=await  new AccountHolderDao().findAccountHolderByEmail(email);
     try {
        const response=responseData.data=='';
        response?toast.error('Email not found'):update(email);
     } catch (error) {        
       console.log(error);
     }
    
    }
    return <div className="p-3">
    <span>Email</span>
    <TextField value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email.." fullWidth/>
    <div className="modal-footer">
    <IconButton onClick={()=>findEmail()}><Search/></IconButton>
    </div>
    <ToastContainer/>
    </div>
}