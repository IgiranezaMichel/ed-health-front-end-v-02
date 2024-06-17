import { Email, Phone, VisibilityOff, Wc } from "@mui/icons-material"
import { Avatar, Button, Card, TextField } from "@mui/material"
import { useAccountHolderContext } from "../context/accountHolder"
import { useAuthenticationContext } from "../auth/authenticationProvider";

export const Setting=()=>{
   const {current}=useAuthenticationContext();
    return<div className="d-flex align-items-center p-2 justify-content-center h-100 bg-light position-fixed w-100">
     <Card elevation={8} className="col-md-4 rounded-0">
     <b className="p-2">Setting</b>
     <Card className="m-2 border p-2">
     <div className="d-flex align-items-center">
        <Avatar src={current.photo} sx={{width:24,height:24}}/> <div className="mx-2">
         {current.name}
        </div>
     </div>
     <div className="d-flex justify-content-between mt-3">
        <div><Email/>{current.email}</div>
        <div><Phone/>{current.phoneNumber}</div>
        <div><Wc/>{current.gender}</div>
     </div>
     </Card>
     <Card className="m-2 border p-2">
        <TextField placeholder="Old password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
        <TextField placeholder="New password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
        <TextField placeholder="Retype password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
     </Card>
     <div className="modal-footer mb-1">
        <Button>Submit</Button>
     </div>
     </Card>
     
    </div>
}