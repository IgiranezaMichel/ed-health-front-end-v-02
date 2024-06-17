import axios from "axios";
import { IHospital } from "../interface/entity/hospital";

const API='http://localhost:8080/api/hospital';
export class HospitalDao{
    public saveHospital=async(hospital:IHospital)=>{
        return await axios.post(API+'/create',hospital,{withCredentials:true});
    }
    public updateHospital=async(hospital:IHospital)=>{
        return await axios.post(API+'/update',hospital,{withCredentials:true});
    }
    public getAllHospital=async(search:string, sort:string, pageNumber:number, pageSize:number)=>{
        return await axios.get(API+'/all?search='+search+'&sort?='+sort+'&pageNumber?='+pageNumber+'pageSize='+pageSize,{withCredentials:true});
    }
    public deleteHospital=async(hospitalId:string)=>{
        return await axios.delete(API+'/'+hospitalId,{withCredentials:true});
     }
     public findHospitalById=async(hospitalId:string)=>{
        return await axios.get(API+'/'+hospitalId,{withCredentials:true});
     }
}