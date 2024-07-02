import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { StudentProvider } from "../../../context/student"
import { SchoolMenu } from "../../../utils/schoolMenu"
import { DisplayStudent } from "./crud/display"
import { StudentStatus } from "../../../enum/StudentStatus"
import { Button } from "@mui/material"

export const SchoolStudents=()=>{
const [studentStatus,setStudentStatus]=useState<StudentStatus>(StudentStatus.ACTIVE);
useEffect(
    ()=>{},[studentStatus]
)
return <Navigation navItems={SchoolMenu}>
<div>
<Button onClick={()=>setStudentStatus(StudentStatus.ACTIVE)} variant={studentStatus==StudentStatus.ACTIVE?'contained':'text'}>Active</Button>
<Button onClick={()=>setStudentStatus(StudentStatus.COMPLETE)} variant={studentStatus==StudentStatus.COMPLETE?'contained':'text'}>Complete</Button>
<Button onClick={()=>setStudentStatus(StudentStatus.DROPOUT)} variant={studentStatus==StudentStatus.DROPOUT?'contained':'text'}>DROPOUT</Button>
<Button onClick={()=>setStudentStatus(StudentStatus.INACTIVE)} variant={studentStatus==StudentStatus.INACTIVE?'contained':'text'}>not active</Button>
<Button onClick={()=>setStudentStatus(StudentStatus.UNKNOWN)} variant={studentStatus==StudentStatus.UNKNOWN?'contained':'text'}>Other</Button>
</div>
<StudentProvider status={studentStatus}>
<DisplayStudent/>
</StudentProvider>

</Navigation>
}