import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { Role } from "../enum/Role";
import { useNavigate } from "react-router-dom";
import { AuthenticationDao } from "../controller/authenticationDao";

const AuthenticationContext=createContext<IState|undefined>(undefined);
export const useAuthenticationContext=()=>{
    const authentication=useContext(AuthenticationContext);
    if(!authentication)throw new Error("Authentication is undefined");
    return authentication;
}
export const AuthenticationProvider=(prop:{children:ReactNode})=>{
    const navigation=useNavigate();
    const [userData,setUserData]=useState<any>([]);
    const [refresh,setRefresh]=useState(true);
    useEffect(
        ()=>{
             new AuthenticationDao().checkSession().then(data=>{
                setUserData(data.data);
                console.log(data);
                if(data.request.responseURL=='http://localhost:8080/login'){
                navigation("/login",{state:{error:"Invalid username or password"}});
                }else{
                    if(data.data.role==Role.ROLE_ADMIN){
                        navigation("/admin")
                    }else if(data.data.role==Role.ROLE_HOSPITAL){
                        navigation("/hospital")
                    }
                    else if(data.data.role==Role.ROLE_NCNM){
                        navigation("/ncnm")
                    }
                    else if(data.data.role==Role.ROLE_SCHOOL){
                        navigation("/school")
                    }else if(data.data.role==Role.ROLE_STUDENT){
                        navigation("/student")
                    }
                    else {
                        navigation("/login")
                    }
                }
               
            }).catch(err=>navigation("/login",{state:{error:err}}));
        },[refresh]
    )
    const data:IState={
        current:userData,
        refresh:()=>setRefresh(!refresh),
        update:(data)=>setUserData(data)
    }
    return <AuthenticationContext.Provider value={data}>
    {prop.children}
    </AuthenticationContext.Provider>
}