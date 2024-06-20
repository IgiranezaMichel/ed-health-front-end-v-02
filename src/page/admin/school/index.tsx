import { Box, Button, Dialog, Grid, IconButton, NativeSelect,Pagination,TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../utils/adminMenu"
import { AddCircle, Close, LocalHospitalOutlined, Search } from "@mui/icons-material"
import { useState } from "react"
import { AdminCreateSchool } from "./crud/create"
import { AdminDisplaySchool } from "../../sharedcomponent/ncnmandadmin/school/displaySchoolAdminTable"
import { SchoolProvider } from "../../../context/school"
import { AccountHolderProvider } from "../../../context/accountHolder"
import { IPage } from "../../../interface/page"
export const AdminSchool=()=>{
    const [addNewHospital,setAddNewHospital]=useState(false);
    const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'id'});
    return <Navigation navItems={AdminMenu}>
       <SchoolProvider>
       <div className="mt-5">
           <Grid className="d-flex justify-content-between align-content-center">
           <TextField value={page.search} onChange={e=>setPage({...page,search:e.target.value})} className="p-0"  InputProps={{startAdornment:<IconButton><Search/></IconButton>}}
           placeholder="Search .."
           sx={{
            '& .MuiInputBase-root':{
                height:'40px'
            }
           }}
           /> 
           <Box>
            <NativeSelect onChange={e=>{e.target.value.length!=0?setPage({...page,sort:e.target.value}):''}} className="p-1 mx-2 border border-2 rounded border-primary-subtle" sx={{}}>
            <option value="" >Sort by</option>
            <option value="name" >name</option>
            <option value="location" >location</option>
            </NativeSelect>
            <Button onClick={()=>setAddNewHospital(true)} variant="outlined" className="p-2"><AddCircle/> create</Button>
           </Box>
           </Grid>
           <AdminDisplaySchool/>
           <div className="float-end">
           <Pagination/>
           </div>
        </div>
        <Dialog open={addNewHospital} maxWidth='xs' PaperProps={{className:'col-12 rounded-4'}}>
        <AccountHolderProvider>
        <AdminCreateSchool>
            <div className="d-flex justify-content-between p-2 bg-success sticky-top text-white">
                <div><LocalHospitalOutlined/> Create New School</div> <div><Close onClick={()=>setAddNewHospital(false)}/></div>
            </div>
        </AdminCreateSchool>
        </AccountHolderProvider>
        </Dialog>
       </SchoolProvider>
    </Navigation>
}