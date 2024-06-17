import axios from "axios"
const API='http://localhost:8080/api/controlPanel';
export class ControlPanelDao{
    public getAllAdminsReferencedByFk=async(schoolId:string)=>{
        return await axios.get(API+'/findSchoolAdmins/'+schoolId,{withCredentials:true})
     }
}