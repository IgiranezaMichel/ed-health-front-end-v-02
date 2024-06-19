import { useLocationContext } from "../../../../context/location"

export const DisplayLocation=()=>{
 const {current}=useLocationContext(); 
    return <>
    <div className="table-responsive-md mt-3">
        <table className="table table-striped table-hover table-borderless align-middle">
            <thead className="">
            <tr>
                   <td className="table-light" colSpan={6}> Manage Location Table</td>
                </tr>
                <tr>
                    <th className="small">Name</th>
                    <th className="small">Location</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {current.length!=0&&current.map((data:any)=><tr className="" key={data.id}>
                    <td className="small">{data.name}</td>
                    <td className="small">{data.type}</td>
                   </tr>) }
            </tbody>
            <tfoot>
            </tfoot>
        </table>
       </div>
    </>
}