
import { Visibility } from "@mui/icons-material";
import { Avatar, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";
import { useJobApplicantContext } from "../../../../context/jobApplicant";
export const ViewHospitalJobApplicant=(prop:{children:ReactNode})=>{
const {current}=useJobApplicantContext();
console.log(current);

    return <>
    {prop.children}
    
    <Paper sx={{ width: '100%', overflow: 'hidden' ,p:1}}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table" className="table-info">
          <TableHead className="bg-info">
          <TableRow>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}>Name</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}>Position</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}>Licence status</TableCell>
                <TableCell align={'inherit'} className="bg-info" style={{ minWidth:170}}>Latest Licence date</TableCell>
                <TableCell align={'center'} className="bg-info"style={{ minWidth:170}}> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                  {current!=undefined&&current.content!=undefined&&current.content.length!=0&&current.content.map((data:any)=><TableRow hover role="checkbox" tabIndex={-1}  >
                        <TableCell align={'left'}>
                           <Avatar src={data.studentPicture}/> {data.studentName}
                         </TableCell>
                        <TableCell align={'left'}>
                        {data.position}
                         </TableCell>
                        <TableCell align={'inherit'}>
                        {data.studentName}
                        </TableCell>
                        <TableCell align={'inherit'}>
                        {data.studentName}
                        </TableCell>
                        <TableCell align={'center'}>
                        <IconButton ><Visibility/></IconButton>
                        </TableCell>
                  </TableRow>)}
                  {current!=undefined&&current.content!=undefined&&current.content.length==0&&<TableRow>
                    <TableCell colSpan={5} className="text-center"><Chip label='No data found !'/></TableCell>
                  </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
     </Paper>
    </>
}
