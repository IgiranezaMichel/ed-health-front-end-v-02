import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IRefresh } from "../interface/refresh";
import { DepartmentDao } from "../controller/department";

 const DepartmentContext=createContext<IRefresh|undefined>(undefined);
export const useDepartmentContext=()=>{
const location=useContext(DepartmentContext);
if(!location)throw Error('Department  is not in context')
return location;
}

export const DepartmentProvider=(prop:{children:ReactNode})=>{
    const [departmentList,setDepartmentList]=useState([]);
    const [refresh,setRefresh]=useState(true);
    const departmentDao=new DepartmentDao().getSchoolDepartments();
    useEffect(
      ()=>{
        departmentDao.then(data=>{setDepartmentList(data.data);setRefresh(false)});
        
      },[refresh]
  )
    const data:IRefresh={
         data:departmentList,
         refresh:()=>setRefresh(!refresh)
    }
    return <DepartmentContext.Provider value={data}>
    {prop.children}
    </DepartmentContext.Provider>
}