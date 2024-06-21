import { Button } from "@mui/material"
import { ReactNode } from "react"

export const LicenceDetailIndex=(prop:{children:ReactNode,licenceId:string})=>{
    return <>
    {prop.children}
     <div>
     <Button>All Applicant</Button>
     <Button>Succed</Button>
     <Button>Fail</Button>
     <Button>Valid</Button>
     <Button>Invalid</Button>
     </div>
    </>
}