import axios from "axios"
import { LocationType } from "../../enum/locationtype";
import { ILocation } from "../../interface/entity/location";
const API='http://localhost:8080/api/location';

export class LocationController{

public saveLocation=async(location:ILocation,fk:any)=>{
      return await  axios.post(API+'?locationFk='+fk, JSON.stringify(location), {
           headers: {
               'Content-Type': 'application/json',
           },withCredentials:true
       })
   }

public getLocationByType=async()=>{
   return await axios.get(API+'/type?locationType='+LocationType.PROVINCE,{withCredentials:true});
}
public getListOfLocationFK=async(locationId:any)=>{
   return await axios.get(API+'/all/fk?location='+locationId,{withCredentials:true});
}

}