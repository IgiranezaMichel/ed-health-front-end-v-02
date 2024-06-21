import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { IDepartment } from "../../../../../interface/entity/department"
import { DepartmentDao } from "../../../../../controller/department";
import { ToastContainer, toast } from "react-toastify";
import { FacultyDao } from "../../../../../controller/faculty";

export const CreateDepartment=(prop:{children:ReactNode})=>{
    const [department,setDepartment]=useState<IDepartment>({name:'',facultyId:''});
    const user=JSON.parse(String(localStorage.getItem('user')));
    const [faculty,setFaculty]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const findFaculty=new FacultyDao().getAllFacultyFromSchool((user!=null&&Object.keys(user).length!=0)?(user.referenceId):'');
    useEffect(
        ()=>{
            findFaculty.then(data=>{setFaculty(data.data);setIsLoading(false)})
        },[]
    )
    const saveDepartment=async(e:any)=>{
        e.preventDefault();
      const responseData=  new DepartmentDao ().saveDepartment(department);
      responseData.then(data=>data.status==201?toast.success(data.data):toast.error(data.data))
      .catch(err=>toast.error(err.message))
    }
    return<>
        {prop.children}
        <h5 className="text-center">Department</h5>
        <form onSubmit={saveDepartment} className="p-2">
        <TextField value={department.name} onChange={(e)=>setDepartment({...department,name:e.target.value})} className="mb-3" label='Name' fullWidth/>
        <label htmlFor="">Select faculty</label>
        <NativeSelect onChange={(e)=>setDepartment({...department,facultyId:e.target.value})} className="form-control border mb-3" fullWidth>
            <option value="">select faculty</option>
            {!isLoading&&faculty.length!=0&&faculty.map((data:any)=><option value={data.id}>{data.name}</option>)}
        </NativeSelect>
        <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
        <ToastContainer/>
        </form>
    </>
}