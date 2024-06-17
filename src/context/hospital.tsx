import { createContext, useContext } from "react";
import { IState } from "../interface/stateContext";

export const HospitalContext=createContext<IState|undefined>(undefined);
export const useHospitalContext=()=>{
const location=useContext(HospitalContext);
if(!location)throw Error('location is undefined')
return location;
}