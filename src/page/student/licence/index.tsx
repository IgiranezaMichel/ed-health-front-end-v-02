import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../utils/studentMenu"
import { StudentLicenceIndex } from "./crud/display";

export const StudentLicence=()=>{
    return <Navigation navItems={StudentMenu} >
       <div className="fw-bolder">
            Licence
        </div>
        <StudentLicenceIndex/>
    </Navigation>
}