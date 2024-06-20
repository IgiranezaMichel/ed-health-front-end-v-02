import {Button, Dialog } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../utils/adminMenu"
import { AddCircle, Close } from "@mui/icons-material"
import { AdminCreateUser } from "./crud/create"
import { useState } from "react"
import {  AccountHolderProvider } from "../../../context/accountHolder"
import { AdminDisplayUser } from "./crud/display"

export const AdminUser=()=>{
    const [addNewUser,setAddNewUser]=useState(false)
    

    return <Navigation navItems={AdminMenu}>
      <AccountHolderProvider>
      <div className="mt-5  ">
      <Button onClick={()=>setAddNewUser(true)} variant="outlined" className="p-2"><AddCircle/> create</Button>
           <AdminDisplayUser/> 
        </div>
        <Dialog open={addNewUser} maxWidth='xs' PaperProps={{className:'col-12 rounded-4'}}>
        <AdminCreateUser>
            <div className="d-flex justify-content-between p-2 bg-success sticky-top text-white">
                <div>Create New User</div> <div><Close onClick={()=>setAddNewUser(false)}/></div>
            </div>
        </AdminCreateUser>
        </Dialog>
      </AccountHolderProvider>
    </Navigation>
}