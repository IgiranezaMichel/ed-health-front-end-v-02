import { DashboardCustomizeOutlined, LocalHospitalSharp,SchoolSharp} from "@mui/icons-material";
import { IMenuProp } from "../interface/menu";

export const SchoolMenu: IMenuProp[] = [
    {
        name: 'Dashboard',
        link: '/school',
        icon: <DashboardCustomizeOutlined/>
    },
    {
        name: 'Material',
        link: '/school/material',
        icon: <SchoolSharp/>
    },
    {
        name: 'Student',
        link: '/school/student',
        icon:<LocalHospitalSharp/>
    }
]