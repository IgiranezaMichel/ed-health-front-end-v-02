import { Email, Person, Phone} from "@mui/icons-material"
import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode } from "react"

export const AdminCreateUser=(prop:{children:ReactNode})=>{
    return<div>
       {prop.children}
       <div className="p-4">
        <TextField fullWidth placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<Person/>}}/>
        <NativeSelect className="mb-3 border p-1" fullWidth>
            <option value="">Select Gender</option>
            <option value="">Male</option>
            <option value="">Female</option>
        </NativeSelect>
        <TextField fullWidth placeholder="Email" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<Email/>}}/>
        <TextField fullWidth placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" InputProps={{startAdornment:<Phone/>}}/>
        <TextField fullWidth type="date" placeholder="Name" sx={{'& .MuiInputBase-root':{height:'40px'}}} className="border mb-3" />
        <NativeSelect className="mb-3 border p-1" fullWidth>
            <option value="">Role</option>
            <option value="">Male</option>
            <option value="">Female</option>
        </NativeSelect>
        <div className="modal-footer">
            <Button>submit</Button>
        </div>
       </div>
    </div>
}