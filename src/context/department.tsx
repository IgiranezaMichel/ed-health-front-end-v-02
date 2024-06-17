import { createContext, useContext } from "react";
import { IRefresh } from "../interface/refresh";

export const DepartmentRefreshContext=createContext<IRefresh|undefined>(undefined);
export const useDepartmentContext=()=>{
const location=useContext(DepartmentRefreshContext);
if(!location)throw Error('Department  is not in context')
return location;
}