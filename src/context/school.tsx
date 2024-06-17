import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { IPage } from "../interface/page";
import { SchoolDao } from "../controller/school";

export const SchoolContext=createContext<IState|undefined>(undefined);
export const useSchoolContext=()=>{
const location=useContext(SchoolContext);
if(!location)throw Error('location is undefined')
return location;
}

export const SchoolProvider=(prop:{children:ReactNode})=>{
    const [refresh,setRefresh]=useState(false);
     const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'id'});
    const [shoolList,setSchoolList]=useState<any>([]);
    const studentDao=new SchoolDao().getAllSchool(page);
    useEffect(
        ()=>{
         studentDao.then(data=>{{            
            setSchoolList(data.data);}}).catch(err=>console.log(err))
        },[page,refresh]
    )
    const data:IState={
        current:shoolList,refresh:()=>setRefresh(!refresh),update:(data:IPage)=>setPage(data)
    }
    return <SchoolContext.Provider value={data}>
        {prop.children}
    </SchoolContext.Provider>
}