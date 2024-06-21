import { Box, Grid, IconButton, NativeSelect,TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { Search } from "@mui/icons-material"
import { NcnmMenu } from "../../../utils/ncnmMenu"

import {SchoolProvider } from "../../../context/school"
import { AdminDisplaySchool } from "../../sharedcomponent/ncnmandadmin/school/displaySchoolAdminTable"

export const NcnmSchool=()=>{
    return <Navigation navItems={NcnmMenu}>
     <SchoolProvider>
     <div className="mt-5">
           <Grid className="d-flex justify-content-between align-content-center">
           <TextField 
        //    value={search} onChange={e=>setSearch(e.target.value)} 
           className="p-0"  InputProps={{startAdornment:<IconButton><Search/></IconButton>}}
           placeholder="Search .."
           sx={{
            '& .MuiInputBase-root':{
                height:'40px'
            }
           }}
           /> 
           <Box>
            <NativeSelect className="p-1 mx-2 border border-2 rounded border-primary-subtle" sx={{}}>
            <option value="" >Sort by</option>
            <option value="name" >name</option>
            <option value="location" >location</option>
            </NativeSelect>
            </Box>
           </Grid>
           <AdminDisplaySchool/>
        </div>
     </SchoolProvider>
    </Navigation>
}