import { Navigation } from "../../../component/navigation"
import { StudentProvider } from "../../../context/student"
import { SchoolMenu } from "../../../utils/schoolMenu"
import { DisplayStudent } from "./crud/display"

export const SchoolStudents=()=>{
return <Navigation navItems={SchoolMenu}>
<StudentProvider>
<DisplayStudent/>
</StudentProvider>

</Navigation>
}