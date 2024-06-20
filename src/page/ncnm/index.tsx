import { Box, Button, Grid, IconButton, TextField } from "@mui/material"
import { Navigation } from "../../component/navigation"
import { AddCircle, Search } from "@mui/icons-material"
import { NcnmMenu } from "../../utils/ncnmMenu"

export const NcnmIndex=()=>{
    return <Navigation navItems={NcnmMenu}>
        <div>
            <h3 className="mb-3">Dashboard</h3>
           <Grid className="d-flex justify-content-between align-content-center">
           <TextField className="p-0"  InputProps={{startAdornment:<IconButton><Search/></IconButton>}}
           placeholder="Search .."
           sx={{
            '& .MuiInputBase-root':{
                height:'40px'
            }
           }}
           /> 
           <Box>
            <Button variant="contained"><AddCircle/> create</Button>
           </Box>
           </Grid>
        </div>

    </Navigation>
}