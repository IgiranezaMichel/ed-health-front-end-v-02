import { Dialog } from "@mui/material"

export const Preloader=(prop:{open:boolean})=>{
    return<Dialog color="transparent" open={prop.open} sx={{bgcolor:'transparent !important'}} className="d-flex bg-transparent justify-content-center align-content-center">
    <div className="text-dark fw-bolder">loading ...</div>
    </Dialog>
}