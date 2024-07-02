import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IRefresh } from "../interface/refresh";
import { FacultyDao } from "../controller/faculty";

const FacultyContext=createContext<IRefresh|undefined>(undefined);
export const useFacultyContext=()=>{
const location=useContext(FacultyContext);
if(!location)throw Error('faculty  is not in context')
return location;
}

export const FacultyProvider=(prop:{children:ReactNode})=>{
    const [facultyList,setFacultList]=useState([]);
    const [refresh,setRefresh]=useState(true);
    const facultyDao=new FacultyDao().getAllFacultyFromSchool();
    useEffect(
      ()=>{
        facultyDao.then(data=>{setFacultList(data.data);setRefresh(false)});
        
      },[refresh]
  )
    const data:IRefresh={
         data:facultyList,
         refresh:()=>setRefresh(!refresh)
    }
    return <FacultyContext.Provider value={data}>
    {prop.children}
    </FacultyContext.Provider>
}