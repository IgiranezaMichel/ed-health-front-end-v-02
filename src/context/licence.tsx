import { createContext, useContext } from "react";
import { IState } from "../interface/stateContext";

export const LicenceContext=createContext<IState|undefined>(undefined);
export const useLicenceContext=()=>{
const Licence=useContext(LicenceContext);
if(!Licence)throw Error('Licence is undefined')
return Licence;
}