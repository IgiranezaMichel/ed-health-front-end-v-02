import { Box, Button, Card, Dialog, Grid, IconButton, NativeSelect,Pagination,TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { AddCircle, Close, LocalHospitalOutlined, Search } from "@mui/icons-material"
import  { useEffect, useState } from "react"
import { NcnmMenu } from "../../../utils/ncnmMenu"
import { LicenceDisplaySchool } from "./crud/display"
import { CreateLicence } from "./crud/create"
import { LicenceDao } from "../../../controller/licence"
import { toast } from "react-toastify"
import { IState } from "../../../interface/stateContext"
import { LicenceContext } from "../../../context/licence"
import { IPage } from "../../../interface/page"

export const Licence=()=>{
    const [addNewLicence,setAddNewLicence]=useState(false);
    const [page,setPage]=useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sort:'timeStamp'
    })
    
    const [hospitalList,setHospitalList]=useState([]);
    const hospital=new LicenceDao().getAllLicence(page.search,page.sort,page.pageNumber,page.pageSize);
    const [refresh,setRefresh]=useState(true);
    const serverSentEvent=new EventSource('http://localhost:8080/api/licence/stream-flux?name='+"Hello Michael");
    useEffect(
        ()=>{
            serverSentEvent.onmessage=(evt)=>{
                console.log(evt.data)
            }
            hospital.then(data=>{setHospitalList(data.data)}).catch(err=>toast.error(err))
        },[page,refresh]
    )
    const data:IState={
        current:hospitalList,
        update:(data)=>setHospitalList(data),
        refresh:()=>setRefresh(!refresh)
    } 
 
    return <Navigation navItems={NcnmMenu}>
       <LicenceContext.Provider value={data}>
           <Grid className="d-flex justify-content-between align-content-center mt-5 stick-top">
           <TextField value={page.search} onChange={e=>setPage({...page,search:e.target.value})} className="p-0"  InputProps={{startAdornment:<IconButton><Search/></IconButton>}}
           placeholder="Search .."
           sx={{
            '& .MuiInputBase-root':{
                height:'40px'
            }
           }}
           /> 
           <Box>
            <NativeSelect onChange={e=>setPage({...page,sort:e.target.value})} className="p-1 mx-2 border border-2 rounded border-primary-subtle" sx={{}}>
            <option value="" >Sort by</option>
            <option value="licenceYear" >Licence year</option>
            <option value="deadline" >Deadline</option>
            <option value="timeStamp" >registration date</option>
            </NativeSelect>
            <Button onClick={()=>setAddNewLicence(true)} variant="outlined" className="p-2" sx={{textTransform:'none'}}><AddCircle/>New Licence</Button>
           </Box>
           </Grid>
           <LicenceDisplaySchool>
           <Card className="p-1">
           {data.current!=undefined&&data.current.pageSize!=0&&<section className="d-flex align-items-center">
              {data.current!=undefined&&<>{data.current.pageNumber+1}</>}/{data.current!=undefined&&<>{data.current.pageSize}</>} page <Pagination/> 
              <input value={page.pageSize} onChange={e=>setPage({...page,pageSize:Number(e.target.value)})} type="number" style={{width:'50px'}}/>
            </section>}
           </Card>
            </LicenceDisplaySchool>
        <Dialog open={addNewLicence} maxWidth='xs' PaperProps={{className:'col-12 rounded-4'}}>
        <CreateLicence>
            <div className="d-flex justify-content-between p-2 bg-success sticky-top text-white align-items-center">
                <div><LocalHospitalOutlined/> Create New Licence</div> <IconButton className="text-white" onClick={()=>setAddNewLicence(false)}><Close/></IconButton>
            </div>
        </CreateLicence>
        </Dialog>
        </LicenceContext.Provider>
    </Navigation>
}