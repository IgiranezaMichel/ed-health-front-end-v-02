import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { FacultyDao } from "../../../../../controller/faculty";

export const DisplayFaculty=()=>{
  const [facultyList,setFacultList]=useState([]);
  const user=JSON.parse(String(localStorage.getItem('user')));
  const [isLoading,setIsLoading]=useState(true);
  const facultyDao=new FacultyDao().getAllFacultyFromSchool((user!=null&&Object.keys(user).length!=0)?(user.referenceId):'');
  useEffect(
    ()=>{
      facultyDao.then(data=>{setFacultList(data.data);setIsLoading(false)});
      console.log(facultyList);
      
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
                 School
                </TableCell>
            </TableRow>
          </TableHead>
          {!isLoading&&facultyList.length!=0&&facultyList.map((data:any,index:number)=><TableBody key={index}>
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
          {!isLoading&&facultyList.length==0&&
            <TableRow>
            <TableCell colSpan={4} className="text-center"><Chip label='No data found'/></TableCell>
            </TableRow>
          }
        </Table>
      </TableContainer>
       
    </Paper>
    </>
}