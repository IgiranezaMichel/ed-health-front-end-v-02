import {LocalHospital} from "@mui/icons-material"
import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode } from "react"

export const NcnmCreateHospital=(prop:{children:ReactNode})=>{
    return<div>
       {prop.children}
       <div className="p-4">
        <TextField fullWidth placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<LocalHospital/>}}/>
        <div className="mb-3">Log</div>
        <input type="file" className="col-12 mb-3 form-control" />
        select province
        <NativeSelect className="mb-3 border p-1" fullWidth>
            <option value="">select district</option>
            <option value="">Male</option>
            <option value="">Female</option>
        </NativeSelect>
        <div className="modal-footer">
            <Button>submit</Button>
        </div>
       </div>
    </div>
}