import { DashboardCustomizeOutlined, Key,NotificationAdd,SchoolSharp} from "@mui/icons-material";
import { IMenuProp } from "../interface/menu";

export const StudentMenu: IMenuProp[] = [
    {
        name: 'Dashboard',
        link: '/student',
        icon: <DashboardCustomizeOutlined/>
    },
    {
        name: 'Jobs',
        link: '/student/job',
        icon: <SchoolSharp/>
    },
    {
        name: 'Licence',
        link: '/student/licence',
        icon:<Key/>
    }
    ,
    {
        name: 'Notification',
        link: '/student/notification',
        icon:<NotificationAdd/>
    }
]