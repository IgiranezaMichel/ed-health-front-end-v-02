import { Box } from "@mui/material"
import { ReactNode } from "react"

export const StudentDetail=(prop:{children:ReactNode,studentId:string})=>{
    return<>
    {prop.children}
    <Box>

    </Box>
    </>
}