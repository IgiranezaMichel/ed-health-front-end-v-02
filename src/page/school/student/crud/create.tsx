import { Avatar, Box, Button, Checkbox, NativeSelect, Step, StepLabel, Stepper, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { IStudent } from "../../../../interface/entity/student"
import { StudentDao } from "../../../../controller/student"
import { StudentStatus } from "../../../../enum/StudentStatus"
import { Man, School, Woman } from "@mui/icons-material"
import { FacultyDao } from "../../../../controller/faculty"
import { DepartmentDao } from "../../../../controller/department"
import { useStudentContext } from "../../../../context/student"
const step=[
    'Create Account','Department Definition'
]
export const CreateStudent=(prop:{children:ReactNode})=>{
    const [student,setStudent]=useState<IStudent>({
        dateOfBirth:'',departmentId:'',gender:'',id:'',name:'',phoneNumber:'',profilePicture:'',schoolId:'',email:'',status:StudentStatus.ACTIVE
    });
    const {refresh}=useStudentContext();
    const [facultyList,setFacultList]=useState([]);
    const [departmentList,setDepartmentList]=useState([]);
    const [isLoadingDepartment,setIsLoadingDepartment]=useState(true);
    const user=JSON.parse(String(localStorage.getItem('user')));
    const [isLoading,setIsLoading]=useState(true);
    const facultyDao=new FacultyDao().getAllFacultyFromSchool((user!=null&&Object.keys(user).length!=0)?(user.referenceId):'');
    useEffect(
      ()=>{
        facultyDao.then(data=>{setFacultList(data.data);setIsLoading(false)});
        console.log(facultyList);
        
      },[]
  )
    const [activeStep,setActiveStep]=useState(0);
    const fetchDepartmentFromFaculty=async(facultyId:string)=>{
        new DepartmentDao().findDepartmentListBelongsInFaculty(facultyId)
        .then(data=>{setDepartmentList(data.data);setIsLoadingDepartment(false)})
    }
    const handleProfile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files&&e.target.files[0]){
            const file=e.target.files[0];
            const fileReader=new FileReader();
             if(file.size>4194304){
                toast.error('The file to upload exceed over 4 Mb')
             }
            fileReader.onload=()=>{
                setStudent({...student,profilePicture:fileReader.result as string});                
            }
            fileReader.readAsDataURL(file);
        }
    }
    const submitStudentFirstInformation=()=>{
       student.name==''?toast.error('Student name is required'):
       student.gender==''?
       student.dateOfBirth==''?toast.error('Date of birth is required')
       :
       student.email==''?toast.error('Email of birth is required')
       :
       student.departmentId==''?toast.error('Department is required')
        :setActiveStep(1):setActiveStep(1)
    }
    const saveStudent=(e:any)=>{
        e.preventDefault();
        const responseData=new StudentDao().saveStudent(student);
        responseData.then(data=>{data.status==201?toast.success(data.data):toast.error(data.data);refresh()})
        .catch(err=>{toast.error(err.response);
        
            toast.error(err.request.response)})
    }
    return<>
   <div className="sticky-top bg-white">
   {prop.children}
    <Stepper activeStep={activeStep} alternativeLabel>
        {step.map(data=><Step >
        <StepLabel>{data}</StepLabel>
        </Step>)}
    </Stepper>
   </div>
        <form onSubmit={saveStudent} className="p-3">
  {activeStep==0&&<Box>
    <div className="text-center fw-bolder p-3">
                Create user Account
            </div>
      <TextField  onChange={(e)=>setStudent({...student,name:e.target.value})} className="mb-3" label='Name' fullWidth/>
        <Box>
            <label htmlFor="">Gender</label>
            <div>
                <span className="me-2"><Checkbox checked={student.gender=='Male'?true:false}   onClick={()=>setStudent({...student,gender:'Male'})}  icon={<Man/>}/>Male </span>
                <span className="me-2"><Checkbox checked={student.gender=='Female'?true:false}  onClick={()=>setStudent({...student,gender:'Female'})} icon={<Woman/>}/>Female </span>
            </div>
        </Box>
        <TextField type="email" required  onChange={(e)=>setStudent({...student,email:e.target.value})} className="mb-3" label='Email' fullWidth/>
        <TextField type="tel" required value={student.phoneNumber} onChange={(e)=>setStudent({...student,phoneNumber:e.target.value})} className="mb-3" label='Phone number' fullWidth/>

        <TextField InputProps={{startAdornment:<>profile</>}} type="file" required onChange={handleProfile} className="mb-3" label='Profile picture' fullWidth/>
        
            <i>Date of birth</i>
        <TextField type="date" value={student.dateOfBirth} onChange={(e)=>setStudent({...student,dateOfBirth:e.target.value})}required className="mb-3"  fullWidth/>
       <div className="modal-footer">
        <Button onClick={()=>submitStudentFirstInformation()}>Next</Button>
      </div>
      </Box>}
      {
        activeStep==1&&<Box>
            <div className="text-center fw-bolder mb-3">
                <div className="text-center p-2">
                    <Avatar src={student.profilePicture} className="m-auto"/>
                </div>
               <School/> School
            </div>
            <i>Select faculty</i>
            <NativeSelect required onChange={(e)=>fetchDepartmentFromFaculty(e.target.value)} className="form-control mb-3" fullWidth>
                <option value="">Select faculty</option>
                {!isLoading&&facultyList.map((data:any)=><option value={data.id}>{data.name}</option>)}
            </NativeSelect>
           {departmentList.length!=0&&<>
            <i>Select Department</i>
            <NativeSelect required onChange={(e)=>setStudent({...student,departmentId:e.target.value})} className="form-control mb-3" fullWidth>
                <option value="">Select Department</option>
                {!isLoadingDepartment&&departmentList.map((data:any)=><option value={data.id}>{data.name}</option>)}
            </NativeSelect>
           </>}
            <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
        </Box>
      }
       
        <ToastContainer/>
        </form>
    </>
}