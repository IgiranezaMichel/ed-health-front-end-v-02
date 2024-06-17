import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Index } from './page';
import { Setting } from './component/setting';
import { AdminIndex } from './page/admin';
import { AdminUser } from './page/admin/user';
import { AdminHospital } from './page/admin/hospital';
import { AdminSchool } from './page/admin/school';
import { NcnmIndex } from './page/ncnm';
import { NcnmSchool } from './page/ncnm/school';
import { NcnmHospital } from './page/ncnm/hospital';
import { Licence } from './page/ncnm/licence';
import 'react-toastify/dist/ReactToastify.css';
import { HospitalAdmin } from './page/hospital';
import { HospitalJobs } from './page/hospital/job';
import { HospitalLicence } from './page/hospital/licence';
import { StudentIndex } from './page/student';
import { StudentJob } from './page/student/job';
import { StudentLicence } from './page/student/licence';
import { StudentNotification } from './page/student/notification';
import { SchoolAdmin } from './page/school';
import { SchoolMaterial } from './page/school/material';
import { SchoolStudents } from './page/school/student';
import { AuthenticationProvider } from './auth/authenticationProvider';
import { Login } from './page/visitor';
export default function App() {
  return (
<Router>
      <>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AuthenticationProvider><AdminIndex/></AuthenticationProvider>} />
          <Route path="/admin/user" element={<AuthenticationProvider><AdminUser/></AuthenticationProvider>} />
          <Route path="/admin/hospital" element={<AuthenticationProvider><AdminHospital/></AuthenticationProvider>} />
          <Route path="/admin/school" element={<AuthenticationProvider><AdminSchool/></AuthenticationProvider>} />

          <Route path="/ncnm" element={<AuthenticationProvider><NcnmIndex/></AuthenticationProvider>} />
          <Route path="/ncnm/licence" element={<AuthenticationProvider><Licence/></AuthenticationProvider>} />
          <Route path="/ncnm/hospital" element={<AuthenticationProvider><NcnmHospital/></AuthenticationProvider>} />
          <Route path="/ncnm/school" element={<NcnmSchool/>} />

          <Route path="/hospital" element={<AuthenticationProvider><HospitalAdmin/></AuthenticationProvider>} />
          <Route path="/hospital/job" element={<AuthenticationProvider><HospitalJobs/></AuthenticationProvider>} />
          <Route path="/hospital/licence" element={<AuthenticationProvider><HospitalLicence/></AuthenticationProvider>} />

          <Route path="/student" element={<AuthenticationProvider><StudentIndex/></AuthenticationProvider>} />
          <Route path="/student/job" element={<AuthenticationProvider><StudentJob/></AuthenticationProvider>} />
          <Route path="/student/notification" element={<AuthenticationProvider><StudentNotification/></AuthenticationProvider>} />
          <Route path="/student/licence" element={<AuthenticationProvider><StudentLicence/></AuthenticationProvider>} />

          <Route path="/school" element={<AuthenticationProvider><SchoolAdmin/></AuthenticationProvider>} />
          <Route path="/school/material" element={<AuthenticationProvider><SchoolMaterial/></AuthenticationProvider>} />
          <Route path="/school/student" element={<AuthenticationProvider><SchoolStudents/></AuthenticationProvider>} />
          
          <Route path="/setting" element={<AuthenticationProvider><Setting/></AuthenticationProvider>} />
          <Route path="*" element={ <Setting/>} />

        </Routes>
      </>
      </Router>
  );
}
