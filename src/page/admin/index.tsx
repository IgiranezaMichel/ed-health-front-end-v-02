import { Navigation } from "../../component/navigation"
import { AdminMenu } from "../../utils/adminMenu"
import {  BarChart } from "@mui/icons-material"
import { Location } from "./location"
export const AdminIndex=()=>{
    return <Navigation navItems={AdminMenu}>
        <div>
            <h3 className="mb-3">Dashboard <BarChart className="p-1 border rounded-circle fs-3"/></h3>
            <div className="row col-6">
        
            </div>
            <Location/>
        </div>
    </Navigation>
}