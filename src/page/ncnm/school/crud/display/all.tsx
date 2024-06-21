import React, { useEffect, useState } from "react";
import { StudentDao } from "../../../../../controller/student"
import { IPage } from "../../../../../interface/page";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    {
      id: 'faculty',
      label: 'Faculty',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  
  ];
export const AllStudent=(prop:{schoolId:string})=>{
    const [page,setPage]=useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sort:'accountHolder'
    })
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
        event;
      setPage({...page,pageNumber:newPage});
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage({...page,pageNumber:0});
    };
    const studentDao=new StudentDao().getAllStudentFromSameSchool(prop.schoolId,page.search,page.sort,page.pageNumber,page.pageSize);
    studentDao.then(data=>console.log(data.data)
    )
    const [userList,setUserList]=useState<any>([]);
    const [loading,setLoading]=useState(true);
    useEffect(
        ()=>{
            studentDao.then(data=>{setUserList(data.data);setLoading(false)}).catch(err=>console.log(err)
            )
        },[loading,page]
    )
    return <>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading&&userList!=undefined&&userList.content!=undefined&&userList.content.map((data:any,index:number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align={'left'}>
                           Mich {index}
                        </TableCell>
                        <TableCell align={'left'}>
                           Mich {index}
                        </TableCell>
                        <TableCell align={'center'}>
                           Mich {index}
                        </TableCell>
                        <TableCell align={'center'}>
                           Mich {index}
                        </TableCell>
                  </TableRow>
                );
              })}
              {!loading&&userList!=undefined&&userList.content!=undefined&&
              <TableRow>
                <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.pageSize}
        rowsPerPage={rowsPerPage}
        page={page.pageNumber}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        </>
}