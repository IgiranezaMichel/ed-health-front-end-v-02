import { Button, TextField } from "@mui/material"
import { ReactNode, useState } from "react"
import { IFaculty } from "../../../../../interface/entity/faculty"
import { ToastContainer, toast } from "react-toastify";
import { FacultyDao } from "../../../../../controller/faculty";

export const CreateFaculty=(prop:{children:ReactNode})=>{
    const [faculty,setFaculty]=useState<IFaculty>({
        name:'',
        schoolId:'',
    });
    const saveFaculty=(e:any)=>{
        e.preventDefault();
        const responseData=new FacultyDao().saveFaculty(faculty);
        responseData.then(data=>data.status==201?toast.success(data.data):toast.error(data.data))
        .catch(err=>toast.error(err.message))
    }
    return<>
      {prop.children}
        <h5 className="text-center">faculty</h5>
        <form onSubmit={saveFaculty} className="p-3">
        <TextField value={faculty.name} onChange={(e)=>setFaculty({...faculty,name:e.target.value})} className="mb-3" label='Name' fullWidth/>
        <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
        <ToastContainer/>
        </form>
    </>
}