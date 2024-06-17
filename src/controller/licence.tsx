import axios from "axios";
import { ILicence } from "../interface/entity/licence";
const API='http://localhost:8080/api/licence';
export class LicenceDao{
    public saveLicence=async(licence:ILicence)=>{
        return await axios.post(API+'/create',licence,{withCredentials:true});
    }
    public updateLicence=async(licence:ILicence)=>{
        return await axios.post(API+'/update',licence,{withCredentials:true});
    }
    public getAllLicence=async(search:string, sort:string, pageNumber:number, pageSize:number)=>{
        return await axios.get(API+'/all?search='+search+'&sort?='+sort+'&pageNumber?='+pageNumber+'&pageSize='+pageSize,{withCredentials:true});
    }
    public deleteLicence=async(licenceId:string)=>{
        return await axios.delete(API+'/'+licenceId,{withCredentials:true});
     }
     public findLicenceById=async(licenceId:string)=>{
        return await axios.get(API+'/'+licenceId,{withCredentials:true});
     }
     
    }