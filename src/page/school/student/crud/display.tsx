import { Close, EditAttributesSharp,Man, Person, School, Search, Wc, Woman } from "@mui/icons-material";
import { Avatar, Button, Chip, Dialog, IconButton,Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { CreateStudent } from "./create";
import {useEffect, useState } from "react";
import { StudentDetail } from "./studentDetail";
import { useStudentContext } from "../../../../context/student";
import { IPage } from "../../../../interface/page";
const column=[
  '#','Name','Gender','Date Of Birth',	'Phone Number',	'Department',	'Faculty',	'Action'
]
export const DisplayStudent=()=>{
  const [newStudent,setNewStudent]=useState(false);
  const [studentDetail,setStudentDetail]=useState({id:'',name:'',photo:'',email:'',department:'',gender:'',open:false});
  const {current,update}=useStudentContext();
  const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'id'});
  useEffect(
    ()=>{
      update(page);
    },[page]
  )
    return<>
    <section className="d-flex justify-content-between align-items-center">
    <div className="fw-bolder fs-5 mt-3 mb-3">Student</div>
    <div className="fw-bolder fs-5 mt-3 mb-3">
      <TextField onChange={(e)=>setPage({...page,search:e.target.value})} type="search" sx={{'& .MuiInputBase-root':{height:40}}}
      placeholder="Search ..." 
      InputProps={{endAdornment:<IconButton><Search/></IconButton>}} className='me-2'/>
      <select onChange={e=>{e.target.value.length!=0?setPage({...page,sort:e.target.value}):''}} className="p-2 border me-2">
        <option value="">Sort by</option>
        <option value="accountHolderName">Name</option>
        <option value="accountHolderGender">Gender</option>
      </select>
      <Button onClick={()=>setNewStudent(true)} className="bg-info text-black fw-bolder p-2 pt-2 mt-0">New</Button>
    </div>
    </section>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                {column.map((data)=><TableCell key={data}>
                 {data}
                </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
                  {current!=undefined&&current.content!=undefined&&current.content.length!=0
                 &&current.content.map(
                 (data:any,index:number)=><TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                          {index+1}
                        </TableCell>
                        <TableCell >
                           <Avatar sx={{width:30,height:30}} src={data.profilePicture}/> {data.name}
                        </TableCell>
                        <TableCell >
                           {data.gender=='Male'?<div className="fw-bolder"><Man/> Male</div>:<div className="fw-bolder"><Woman/> woman</div>}
                        </TableCell>
                        <TableCell >
                            {data.dateOfBirth}
                        </TableCell>
                        <TableCell >
                        {data.phoneNumber}
                        </TableCell>
                        <TableCell >
                        {data.departmentName}
                        </TableCell>
                        <TableCell >
                        {data.facultyName}
                        </TableCell>
                        <TableCell >
                         <IconButton onClick={()=>setStudentDetail({id:data.id,department:data.departmentName,email:data.email,name:data.name,gender:data.gender,open:true,photo:data.profilePicture})}><EditAttributesSharp className="fs-1"/></IconButton>
                        </TableCell>
                  </TableRow>)}
                  <tr className=" col-12">
                  <td colSpan={9}>
                    <div className="float-end d-flex justify-content-center align-items-center">{current.pageNumber}/{current.pageSize}<Pagination/> 
                    <select name="" id="" onChange={e=>e.target.value.length==0?'':setPage({...page,pageSize:Number(e.target.value)})}>
                      <option value="1">10</option>
                      <option value="2">20</option>
                    </select></div>
                  </td>
                  </tr>
                  {current!=undefined&&current.content!=undefined&&current.content.length==0&&
                  <TableRow>
                <TableCell colSpan={8} className="text-center"><Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      {/* student detail */}
      <Dialog open={newStudent} maxWidth='xs' PaperProps={{className:'col-12'}}>
      <CreateStudent>
        <div className="d-flex align-items-center justify-content-between p-2">
          <div>New Student</div>
          <IconButton onClick={()=>setNewStudent(false)}><Close/></IconButton>
        </div>
        </CreateStudent>
      </Dialog>
      <Dialog sx={{width:'100%',mx:{md:'5%'}}} open={studentDetail.open} maxWidth='sm' PaperProps={{className:'col-12'}}>
      <StudentDetail studentId={studentDetail.id}>
        <div className="d-flex align-items-center justify-content-between p-2">
          <div>Student Detail</div>
          <IconButton onClick={()=>setStudentDetail({...studentDetail,open:false})}><Close/></IconButton>
        </div>
        <div>
        <section className="d-flex  p-1">
          <div className="card col-md-6 border-0">
            <img src={studentDetail.photo} className="card-img"/>
          </div>
          <div className="card border-0 p-2 col-md-6 ">
            <Paper className="p-2 d-flex mb-1 align-items-center justify-content-between">
              <div>
              <div className="fw-bolder">Name</div>
              <i>{studentDetail.name}</i>
              </div>
              <Person className="fs-1"/>
              </Paper>
              <Paper elevation={2} className="p-2 border d-flex mb-2 align-items-center justify-content-between">
              <div>
              <div className="fw-bolder">Department</div>
              <i className="small">{studentDetail.department}</i>
              </div>
              <School className="fs-1"/>
              </Paper>
              <Paper className="p-2 d-flex mb-2 align-items-center justify-content-between">
              <div>
              <div className="fw-bolder">Gender</div>
              <i>{studentDetail.gender}</i>
              </div>
              <Wc className="fs-1"/>
              </Paper>
          </div>
        </section>
        </div>
        </StudentDetail>
      </Dialog>
    </Paper>
    </>
}