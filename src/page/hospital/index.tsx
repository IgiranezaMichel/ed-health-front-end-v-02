import { Navigation } from "../../component/navigation"
import { HospitalMenu } from "../../utils/hospitalMenu"

export const HospitalAdmin=()=>{
    return<Navigation navItems={HospitalMenu}>
        <div className="fw-bolder fs-2" style={{fontFamily:'fantasy'}}>
            Dashboard
        </div>
    </Navigation>
}