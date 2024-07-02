import axios from "axios";
import { IAccountHolder } from "../interface/entity/accountholder";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/accountHolder';
export class AccountHolderDao{
    public saveAccountHolder=async(user:IAccountHolder,password:string)=>{
        return await axios.post(API+'/create?password='+password,user,{withCredentials:true});
    }
    public updateAccountHolder=async(user:IAccountHolder)=>{
        return await axios.post(API+'/update',user,{withCredentials:true});
    }
    public getAllAccountHolder=async(page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&sort?='+page.sort+'&pageNumber?='+page.pageNumber+'&pageSize='+page.pageSize,{withCredentials:true});
    }
    public deleteAccountHolder=async(userId:string)=>{
        return await axios.delete(API+'/'+userId,{withCredentials:true});
     }
     public findAccountHolderById=async(userId:string)=>{
        return await axios.get(API+'/'+userId,{withCredentials:true});
     }
     public findAccountHolderByEmail=async(email:string)=>{
        return await axios.get(API+'/find?email='+email,{withCredentials:true});
     }
     public changePassword=async(old:string,newPassword:string)=>{
        return await axios.get(API+'/changePassword/'+old+"/"+newPassword,{withCredentials:true});
     }
}