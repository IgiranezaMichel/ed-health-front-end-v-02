import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
export const StudentLicenceIndex=()=>{
    return <>
       
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell >
                 Table
                </TableCell>
                <TableCell >
                 Table
                </TableCell>
                <TableCell >
                 Table
                </TableCell>
                <TableCell >
                 Table
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                  <TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                           Mich  
                        </TableCell>
                        <TableCell >
                           Mich  
                        </TableCell>
                        <TableCell >
                           Mich  
                        </TableCell>
                        <TableCell >
                           Mich 
                        </TableCell>
                  </TableRow>
            
              <TableRow>
                <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
       
    </Paper>
    </>
}