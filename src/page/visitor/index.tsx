import { LockPerson, Visibility } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { AuthenticationDao } from "../../controller/authenticationDao"
import { useState } from "react"
import { ILogin } from "../../interface/login"
import { Role } from "../../enum/Role"
import { useNavigate } from "react-router-dom"

export const Login=()=>{
    const [loginData,setLoginData]=useState<ILogin>({username:'',password:''});
    const navigation=useNavigate();
    const loginHandler=async(e:any)=>{
        e.preventDefault();
        await new AuthenticationDao().login(loginData).then(
            data=>{ 
                
                
                if(data.data==Role.ROLE_ADMIN){

                    navigation("/admin")
                }else if(data.data==Role.ROLE_HOSPITAL){
                    navigation("/hospital")
                }
                else if(data.data==Role.ROLE_NCNM){
                    navigation("/ncnm")
                }
                else if(data.data==Role.ROLE_SCHOOL){
                    navigation("/school")
                }else if(data.data==Role.ROLE_STUDENT){
                    navigation("/student")
                }
                else {
                    navigation("/login")
                }
            }).catch(err=>navigation("/login",{state:{error:err}}));
         
    }
    return<form onSubmit={loginHandler} className="h-100 position-fixed w-100 d-flex align-items-center bg-info" style={{}}>
    <Box margin={'auto'}  justifyContent={'center'} sx={{width:{md:'40%'},bgcolor:'white',p:2}}>
        <div className="fs-4 mb-4 fw-bolder">
            Login
        </div>
        <TextField onChange={e=>setLoginData({...loginData,username:e.target.value})} value={loginData.username} className="mb-3" InputProps={{startAdornment:<LockPerson/>}} fullWidth/>
        <TextField type="password" onChange={e=>setLoginData({...loginData,password:e.target.value})} value={loginData.password} className="mb-3" InputProps={{startAdornment:<Visibility/>}} fullWidth/>
        <div className="modal-footer">
            <Button type="submit">submit</Button>
        </div>
    </Box>
    </form>
}