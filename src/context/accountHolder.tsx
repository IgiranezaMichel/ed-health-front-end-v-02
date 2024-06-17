import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/stateContext";
import { IPage } from "../interface/page";
import { AccountHolderDao } from "../controller/accountHolder";
const AccountHolderContext=createContext<IState|undefined>(undefined);
export const useAccountHolderContext=()=>{
const location=useContext(AccountHolderContext);
if(!location)throw Error('undefined')
return location;
}
export const AccountHolderProvider=(prop:{children:ReactNode})=>{
    const [userList,setUserList]=useState([]);
    const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sort:'name'});
    const [refresh,setRefresh]=useState(false);
    const userdao=new AccountHolderDao().getAllAccountHolder(page);
    useEffect(
        ()=>{
            userdao.then(data=>setUserList(data.data)).catch(err=>console.log(err));
        },[page,refresh]
    )
    const data:IState={
        current:userList,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }    
    return <AccountHolderContext.Provider value={data}>
        {prop.children}
    </AccountHolderContext.Provider>
    
}