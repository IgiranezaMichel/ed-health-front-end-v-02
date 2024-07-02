import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { Role } from "../enum/Role";
import { ISchool } from "../interface/entity/school";
export const SchoolAdminContext=createContext<IState|undefined>(undefined);
export const useSchoolAdminContext=()=>{
const location=useContext(SchoolAdminContext);
if(!location)throw Error('location is undefined')
return location;
}
export const SchoolAdminProvider=(prop:{children:ReactNode})=>{
    const [refresh,setRefresh]=useState(false);
    const [school,setSchool]=useState<ISchool>({
        location:'',logo:'',name:'',id:'',
        accountHolderDto:{dob:'',email:'',gender:'',id:'',name:'',password:'',phoneNumber:'',photo:'',role:Role.ROLE_SCHOOL}});
    useEffect(
        ()=>{ },[school,refresh]
    )
    const data:IState={
        current:school,refresh:()=>setRefresh(!refresh),update:(data:ISchool)=>setSchool(data)
    }
    return <SchoolAdminContext.Provider value={data}>
        {prop.children}
    </SchoolAdminContext.Provider>
}