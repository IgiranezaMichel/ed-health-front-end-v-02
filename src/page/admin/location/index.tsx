import { Button, Dialog, IconButton } from "@mui/material"
import { useState } from "react"
import { CreateLocation } from "./crud/create";
import { Close } from "@mui/icons-material";
import {  LocationProvider } from "../../../context/location";
import { DisplayLocation } from "./crud/display";

export const Location=()=>{
    const [createNewLocation,setCreateNewLocation]=useState(false);
    return <LocationProvider>
    <section className="d-flex  justify-content-between align-items-center">
    <div>Location </div> <Button onClick={()=>setCreateNewLocation(true)}>New</Button>
    </section>
    <DisplayLocation/>
    <Dialog maxWidth='xs' open={createNewLocation} className="rounded-0">
     <CreateLocation>
        <div className="d-flex justify-content-between align-items-center p-1 text-white sticky-top bg-success">
            <div>New Location</div> <IconButton className="text-white" onClick={()=>setCreateNewLocation(false)}><Close/></IconButton>
         </div>
     </CreateLocation>
    </Dialog>
    </LocationProvider>
}