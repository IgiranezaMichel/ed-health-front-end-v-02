import { Button } from "@mui/material";
import { ReactNode } from "react";
import { AllStudent } from "./all";
export const SchoolDetailIndex=(prop:{schoolId:string,children:ReactNode})=>{
return <>
{prop.children}
<div className="d-flex p-1">
<Button variant="contained" className="p-1 me-1">All</Button>
<Button variant="contained" className="p-1 me-1">Active</Button>
<Button variant="contained" className="p-1 me-1">Complete</Button>
<Button variant="contained" className="p-1 me-1">Ejected</Button>
<Button variant="contained" className="p-1 me-1">Licenced</Button>
<Button variant="contained" className="p-1 me-1">Expired Licence</Button>
</div>
<AllStudent schoolId={prop.schoolId}/>
{/* <StudentStatus/> */}
</>
}