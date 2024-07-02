import { Card } from "@mui/material"
import { Navigation } from "../../component/navigation"
import { StudentMenu } from "../../utils/studentMenu"
import { Person, Phone, School, Wc } from "@mui/icons-material"
import { useAuthenticationContext } from "../../auth/authenticationProvider"

export const StudentIndex=()=>{
    const {current}=useAuthenticationContext();
    console.log(current);
    
    return <Navigation navItems={StudentMenu}>
        <section className="row  g-2 justify-content-between">
            <Card elevation={0} className="border-0 border-start card border-3 border-info  col-md-4">
               <div className="row">
               <div className="col-md-3 rounded-0 d-flex justify-content-center align-items-center ">
                <img src={current.photo} alt={current.name+'.jpg'} className="card-img"/>
                </div>
                <div className="col-md-9  ps-2">
                    <ul>
                        <li className="nav-link mb-2 mb-3"><Person className="rounded-circle p-1 border"/>{current.name}</li>
                        <li className="nav-link mb-2 mb-3"><Wc className="rounded-circle p-1 border"/>{current.gender}</li>
                        <li className="nav-link mb-2 mb-3"><Phone className="rounded-circle p-1 border"/>{current.phoneNumber}</li>
                    </ul>
                </div>
               </div>
            </Card>
            <Card elevation={0} className="card col-md-4 rounded-0 border-0 border-start card border-3 border-secondary ps-2">
                <div className="fs-5" style={{fontFamily:'fantasy'}}><School className="me-2"/>School</div>
            </Card>
            <Card elevation={0} className="card col-md-4 rounded-0 border-0 border-start card border-3 border-primary ps-2">
            <div className="fs-5 mb-3" style={{fontFamily:'fantasy'}}><School className="me-2"/>Studies</div>
            <div className="mb-3"><b>Faculty</b></div>
            <div><b>Department</b></div>
            </Card>
        </section>
    </Navigation>
}