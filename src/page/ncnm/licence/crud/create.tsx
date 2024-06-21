import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode, useState } from "react"
import { ILicence } from "../../../../interface/entity/licence"
import { MONTH } from "../../../../enum/month"
import { month } from "../../../../utils/month"
import { LicenceDao } from "../../../../controller/licence"
import { ToastContainer, toast } from "react-toastify"

export const CreateLicence=(prop:{children:ReactNode})=>{
    const [licence,setLicence]=useState<ILicence>({
        deadline:'',
        licenceYear:'',
        id:'',
        month:MONTH.JANUARY,
    });
    const toDay=new Date();
    const [fromDate,setFromDate]=useState(toDay.getFullYear());
    const handleSaveLicence=async(e:any)=>{
        e.preventDefault();
       setLicence({...licence,licenceYear:(fromDate+' - '+(fromDate+1))});
       const responseData= new LicenceDao().saveLicence(licence);
       responseData.then(data=>{
        console.log(data);
        data.status==201?toast.success(data.data):toast.error(data.data)
       }).catch(err=>toast.error(err.response.message));
    }
    return<div>
       {prop.children}
       <form onSubmit={handleSaveLicence} className="p-4">
       Licence year
        <div className="d-flex aling-items-between mb-3">
        <NativeSelect onChange={e=>setFromDate(Number(e.target.value))} className="mb-3 border p-1" fullWidth>
            <option value="">from year</option>
            <option selected value={toDay.getFullYear()}>{toDay.getFullYear()}</option>
            <option value={toDay.getFullYear()+1}>{toDay.getFullYear()+1}</option>
        </NativeSelect> 
        <div className="p-2">to</div>
        <NativeSelect disabled  className="mb-3 border p-1" fullWidth>
            <option value="">to year</option>
            <option selected value={fromDate+1}>{fromDate+1}</option>
        </NativeSelect>
        </div>
        Cohort month
        <NativeSelect onChange={e=>setLicence({...licence,month:e.target.value as MONTH})} className="mb-3 border p-1" fullWidth>
            <option value="">Cohort Month</option>
             {month.map(data=><option key={data}>{data}</option>)}
        </NativeSelect>
        <TextField type="date" value={licence.deadline} onChange={e=>setLicence({...licence,deadline:e.target.value})} label='Deadline' InputLabelProps={{shrink:true}} placeholder="deadline" fullWidth/>
        <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
       </form>
       <ToastContainer/>
    </div>
}