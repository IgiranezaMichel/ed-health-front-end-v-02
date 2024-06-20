import { Avatar } from "@mui/material"
export const NcnmDisplayHospital=()=>{
    return <>
    <div className="table-responsive-md mt-3">
        <table className="table table-striped table-hover table-borderless table-secondary align-middle">
            <thead className="">
            <tr>
                   <td className="table-light" colSpan={6}> Manage Hospital</td>
                </tr>
                <tr>
                    <th className="small">Name</th>
                    <th className="small">Location</th>
                    <th className="small">Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                <tr className="">
                    <td className="small">
                        <div className="d-flex align-items-center">
                        <Avatar sx={{ width: 24, height: 24 }}/> <div className="mx-1">Hello </div>
                        </div>
                    </td>
                    <td className="small">Item</td>
                    <td className="small">Item</td>
                   </tr> 
            </tbody>
            <tfoot>
            </tfoot>
        </table>
       </div>
    </>
}