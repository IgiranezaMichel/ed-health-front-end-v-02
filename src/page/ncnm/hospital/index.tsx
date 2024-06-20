import { Box, Button, Dialog, Grid, IconButton, NativeSelect,TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { AddCircle, Close, LocalHospitalOutlined, Search } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { NcnmCreateHospital } from "./crud/create"
import { NcnmMenu } from "../../../utils/ncnmMenu"
import { DisplayHospitals } from "../../sharedcomponent/ncnmandadmin/hospital/display"
import { HospitalDao } from "../../../controller/hospital"
import { IState } from "../../../interface/stateContext"
import { HospitalContext } from "../../../context/hospital"
import { ToastContainer, toast } from "react-toastify"

export const NcnmHospital=()=>{
    const [addNewHospital,setAddNewHospital]=useState(false)
    const [search,setSearch]=useState('');
    const [sort,setSort]=useState('name');
    const [pageNumber,setPageNumber]=useState(0);
    const [pageSize,setPageSize]=useState(10);
    const [hospitalList,setHospitalList]=useState([]);
    const hospital=new HospitalDao().getAllHospital(search,sort,pageNumber,pageSize);
    const [loading,setLoading]=useState(true);
    const [refresh,setRefresh]=useState(true);
    useEffect(
        ()=>{
            hospital.then(data=>{setHospitalList(data.data);setLoading(false)}).catch(err=>toast.error(err))
        },[search,sort,pageNumber,pageSize,refresh]
    )
    const data:IState={
        current:hospitalList,
        update:(data)=>setHospitalList(data),
        refresh:()=>setRefresh(!refresh)
    }    
    return <Navigation navItems={NcnmMenu}>
      <HospitalContext.Provider value={data}>
      <div className="mt-5">
           <Grid className="d-flex justify-content-between align-content-center">
           <TextField value={search} onChange={e=>setSearch(e.target.value)} className="p-0"  InputProps={{startAdornment:<IconButton><Search/></IconButton>}}
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
            </NativeSelect>
            <Button onClick={()=>setAddNewHospital(true)} variant="outlined" className="p-2"><AddCircle/> create</Button>
           </Box>
           </Grid>
           <DisplayHospitals/>
        </div>
        <Dialog open={addNewHospital} maxWidth='xs' PaperProps={{className:'col-12 rounded-4'}}>
        <NcnmCreateHospital>
            <div className="d-flex justify-content-between p-2 bg-success sticky-top text-white">
                <div><LocalHospitalOutlined/> Create New Hospital</div> <div><Close onClick={()=>setAddNewHospital(false)}/></div>
            </div>
        </NcnmCreateHospital>
        </Dialog>
      </HospitalContext.Provider>
      <ToastContainer/>
    </Navigation>
}