import { DashboardCustomizeOutlined, Key, LocalHospitalSharp,SchoolSharp} from "@mui/icons-material";
import { IMenuProp } from "../interface/menu";

export const NcnmMenu: IMenuProp[] = [
    {
        name: 'Dashboard',
        link: '/ncnm',
        icon: <DashboardCustomizeOutlined/>
    },
    {
        name: 'School',
        link: '/ncnm/school',
        icon: <SchoolSharp/>
    },
    {
        name: 'Hospital',
        link: '/ncnm/hospital',
        icon:<LocalHospitalSharp/>
    },
    {
        name: 'Licence',
        link: '/ncnm/licence',
        icon:<Key/>
    }
]