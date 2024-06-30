import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../utils/studentMenu"

export const StudentNotification=()=>{
    return <Navigation navItems={StudentMenu}>
        <div className="fs-4 fw-bolder">Notification</div>
    </Navigation>
}