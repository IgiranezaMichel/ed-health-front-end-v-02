import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { LocationController } from "../controller/location/location";

const LocationContext=createContext<IState|undefined>(undefined);
export const useLocationContext=()=>{
const location=useContext(LocationContext);
if(!location)throw Error('location is undefined')
return location;
}
export const LocationProvider=(prop:{children:ReactNode})=>{
    
    const locationDao=new LocationController().getLocationByType();
    const [locationList,setLocationList]=useState([]);
    const [refresh,setRefresh]=useState(false);
    useEffect(
        ()=>{
            locationDao.then(data=>{setLocationList(data.data);
            
            }).then(err=>console.log(err))
        },[refresh]
    )
    const data:IState={
        current:locationList,
        refresh:()=>setRefresh(!refresh),
        update:(data)=>setLocationList(data)
    }
    return <LocationContext.Provider value={data}>
    {prop.children}
    </LocationContext.Provider>
}