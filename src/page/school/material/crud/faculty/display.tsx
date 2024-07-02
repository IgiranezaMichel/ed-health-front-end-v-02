import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useFacultyContext } from "../../../../../context/faculty";
export const DisplayFaculty=()=>{
const {data}=useFacultyContext();
    return<>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell >
                 #
                </TableCell>
                <TableCell >
                 Name
                </TableCell>
                <TableCell >
                 School
                </TableCell>
            </TableRow>
          </TableHead>
          {data.length!=0&&data.map((data:any,index:number)=><TableBody key={index}>
                  <TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                           {index+1}
                        </TableCell>
                        <TableCell >
                            {data.name}
                        </TableCell>
                        <TableCell >
                            {data.schoolName}
                        </TableCell>
                  </TableRow>
          </TableBody>)}
          {data.length==0&&
            <TableRow>
            <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
            </TableRow>
          }
        </Table>
      </TableContainer>
       
    </Paper>
    </>
}