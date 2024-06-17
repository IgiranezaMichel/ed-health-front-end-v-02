import axios from "axios";
import { ILogin } from "../interface/login";

export class AuthenticationDao{
private API:string='http://localhost:8080';
public login=async(login:ILogin)=>{
    const form=new FormData();
    form.append('username',login.username);
    form.append('password',login.password);
   return await axios.post(this.API+'/login',form,{withCredentials:true});
}
public checkSession=async()=>{
   return axios.get(this.API+'/checkSession',{withCredentials:true})
}
}