import { Navigation } from "../../../component/navigation"
import { HospitalMenu } from "../../../utils/hospitalMenu"
import { DisplayLicencedWorker } from "./crud/display"

export const HospitalLicence=()=>{
    return <Navigation navItems={HospitalMenu}>
        <div className="fs-3 fw-bolder mt-3">Licenced student</div>
        <DisplayLicencedWorker/>
    </Navigation>
}