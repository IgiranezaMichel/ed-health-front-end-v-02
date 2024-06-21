import { Button } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { SchoolMenu } from "../../../utils/schoolMenu"
import { School } from "@mui/icons-material"
import { SchoolDepartmentIndex } from "./crud/department"
import { useState } from "react"
import { SchoolFacultyIndex } from "./crud/faculty"

export const SchoolMaterial=()=>{
    const [show,setShow]=useState('faculty');
    return <Navigation navItems={SchoolMenu}>
        <div className="fw-bolder fs-5 mt-3 mb-3"><School/> School</div>
        <div className="mb-3">
        <Button className="" onClick={()=>setShow('faculty')} variant={show=='faculty'?'contained':'text'}>Faculty</Button>
        <Button onClick={()=>setShow('department')} variant={show=='department'?'contained':'text'}>Department</Button>
        
        </div>
        {show=='faculty'&&<SchoolFacultyIndex/>}
        {show=='department'&&<SchoolDepartmentIndex/>}
    </Navigation>
}