import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { StudentDao } from "../controller/student";
import { IPage } from "../interface/page";
import { StudentStatus } from "../enum/StudentStatus";
export const StudentContext=createContext<IState|undefined>(undefined);
export const useStudentContext=()=>{
const location=useContext(StudentContext);
if(!location)throw Error('location is undefined')
return location;
}
export const StudentProvider=(prop:{children:ReactNode,status:StudentStatus})=>{
    const [refresh,setRefresh]=useState(false);
     const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'id'});
    const [studentList,setStudentList]=useState<any>([]);
    const studentDao=new StudentDao().getAllStudentFromSameSchool(page,prop.status);
    useEffect(
        ()=>{
         studentDao.then(data=>{{
            console.log(data.request.readyState);
            
            setStudentList(data.data);}}).catch(err=>console.log(err))
        },[page,refresh,prop.status]
    )
    const data:IState={
        current:studentList,refresh:()=>setRefresh(!refresh),update:(data:IPage)=>setPage(data)
    }
    return <StudentContext.Provider value={data}>
        {prop.children}
    </StudentContext.Provider>
}