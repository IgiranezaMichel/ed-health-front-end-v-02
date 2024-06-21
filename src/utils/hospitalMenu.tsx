/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardCustomizeOutlined, LocalHospitalOutlined, WorkOutlineRounded } from "@mui/icons-material";
import { IMenuProp } from "../interface/menu";
export const HospitalMenu: IMenuProp[] = [
    {
        name: 'Dashboard',
        link: '/hospital',
        icon: <DashboardCustomizeOutlined />
    },
    {
        name: 'Job',
        link: '/hospital/job',
        icon: <WorkOutlineRounded />
    },
    {
        name: 'Licence',
        link: '/hospital/licence',
        icon: <LocalHospitalOutlined />
    }
]