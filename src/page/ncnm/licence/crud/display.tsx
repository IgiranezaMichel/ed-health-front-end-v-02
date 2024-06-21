import { Close, Visibility } from "@mui/icons-material";
import { useLicenceContext } from "../../../../context/licence"
import { Chip, Dialog, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ReactNode, useState } from "react";
import { LicenceDetailIndex } from "./detail";
export const LicenceDisplaySchool=(prop:{children:ReactNode})=>{
    const {current}=useLicenceContext();
    const [showLicenceDetail,setShowLicenceDetail]=useState(false);
    const [licenceId,setLicenceId]=useState('');
    return <>
    <div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table" className="table-info">
          <TableHead className="bg-info">
          <TableRow>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}> Licence year</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}> Cohort month</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}> Deadline</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}> Done at</TableCell>
                <TableCell align={'center'} className="bg-info"style={{ minWidth:170}}> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {current!=undefined&&current.content!=undefined&&current.content.length!=0&&
                current.content.map((data:any,index:number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align={'left'}>
                        {data.licenceYear}
                        </TableCell>
                        <TableCell align={'left'}>
                        {data.month}
                        </TableCell>
                        <TableCell align={'inherit'}>
                        {data.deadline}
                        </TableCell>
                        <TableCell align={'inherit'}>
                        {data.timeStamp}
                        </TableCell>
                        <TableCell align={'center'}>
                        <IconButton onClick={()=>{setLicenceId(data.id);setShowLicenceDetail(true)}}><Visibility/></IconButton>
                        </TableCell>
                  </TableRow>
                );
              })}
              {current!=undefined&&current.content!=undefined&&current.content.length==0&&
              <TableRow>
                <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      {prop.children}
    </Paper>
        <Dialog open={showLicenceDetail} maxWidth='md'TransitionComponent={Slide} sx={{width:'100%',mx:{md:'10% !important'}}} PaperProps={{className:'col-12'}}>
            <LicenceDetailIndex licenceId={licenceId}>
                 <section className="d-flex justify-content-between align-items-center p-2">
                    <div>Licence detail</div><IconButton onClick={()=>setShowLicenceDetail(false)}><Close/></IconButton>
                 </section>
            </LicenceDetailIndex>
        </Dialog>
       </div>
    </>
}