import { createContext, useContext } from "react";
import { IRefresh } from "../interface/refresh";

export const FacultyRefreshContext=createContext<IRefresh|undefined>(undefined);
export const useFacultyContext=()=>{
const location=useContext(FacultyRefreshContext);
if(!location)throw Error('faculty  is not in context')
return location;
}