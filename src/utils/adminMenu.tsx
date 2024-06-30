/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardCustomizeOutlined, LocalHospitalOutlined, PeopleAltOutlined, School } from "@mui/icons-material";
import { IMenuProp } from "../interface/menu";
export const AdminMenu: IMenuProp[] = [
    {
        name: 'Dashboard',
        link: '/admin',
        icon: <DashboardCustomizeOutlined />
    },
    {
        name: 'System User',
        link: '/admin/user',
        icon: <PeopleAltOutlined />
    },
    {
        name: 'Hospitals',
        link: '/admin/hospital',
        icon: <LocalHospitalOutlined />
    },
    {
        name: 'School',
        link: '/admin/school',
        icon: <School />
    }
]