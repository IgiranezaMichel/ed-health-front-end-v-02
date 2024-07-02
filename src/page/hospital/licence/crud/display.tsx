
import { Visibility } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
export const DisplayLicencedWorker=()=>{
    return <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
 
                  <TableRow hover role="checkbox" tabIndex={-1}  >
                        <TableCell align={'left'}>
                         </TableCell>
                        <TableCell align={'left'}>
                         </TableCell>
                        <TableCell align={'inherit'}>
                      
                        </TableCell>
                        <TableCell align={'inherit'}>
                         
                        </TableCell>
                        <TableCell align={'center'}>
                        <IconButton ><Visibility/></IconButton>
                        </TableCell>
                  </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
     </Paper>
    </>
}
