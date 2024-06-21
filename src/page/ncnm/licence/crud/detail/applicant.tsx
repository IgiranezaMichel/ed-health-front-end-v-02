import { Card } from "@mui/material"
import { ReactNode } from "react"

export const LicenceApplicantIndex=(prop:{children:ReactNode,licenceId:string})=>{
    return<>
    <div>{prop.children}</div>
    <Card>
        <div
            className="table-responsive-md"
        >
            <table
                className="table table-striped-columns table-hover table-borderless table-primary align-middle"
            >
                <thead className="table-light">
                    <caption>
                        Table Name
                    </caption>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr
                        className="table-primary"
                    >
                        <td scope="row">Item</td>
                        <td>Item</td>
                        <td>Item</td>
                    </tr>
                    <tr
                        className="table-primary"
                    >
                        <td scope="row">Item</td>
                        <td>Item</td>
                        <td>Item</td>
                    </tr>
                </tbody>
                <tfoot>
                    
                </tfoot>
            </table>
        </div>
        
    </Card>
    </>
}