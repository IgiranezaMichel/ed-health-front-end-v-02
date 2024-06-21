import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { DepartmentDao } from "../../../../../controller/department";
export const DisplayDepartment=()=>{
  const [departmentList,setDepartmentList]=useState([]);
  const user=JSON.parse(String(localStorage.getItem('user')));
  const [isLoading,setIsLoading]=useState(true);
  const departmentDao=new DepartmentDao().getSchoolDepartments((user!=null&&Object.keys(user).length!=0)?(user.referenceId):'');
  useEffect(
    ()=>{
      departmentDao.then(data=>{setDepartmentList(data.data);setIsLoading(false)});
      console.log(departmentList);
      
    },[]
)
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
                 Faculty
                </TableCell>
            </TableRow>
          </TableHead>
         {!isLoading&&departmentList.length!=0&&departmentList.map ((data:any,index:number)=><TableBody key={index}>
                  <TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                           {index+1}  
                        </TableCell>
                        <TableCell >
                           {data.name}  
                        </TableCell>
                        <TableCell >
                           {data.facultyName}  
                        </TableCell>
                  </TableRow>
          </TableBody>)}
          {isLoading&&departmentList.length==0&&<TableRow>
                <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
                </TableRow>}
        </Table>
      </TableContainer>
       
    </Paper>
    </>
}