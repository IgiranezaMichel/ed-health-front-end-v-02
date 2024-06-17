import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import * as React from 'react';
import { closeSidebar } from './navigationUtil';
import { IMenuProp } from '../interface/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { Abc } from '@mui/icons-material';
import { Avatar, Box, Button, Dialog, Divider, GlobalStyles, IconButton,List, ListItem, ListItemButton, Paper, Typography, listItemButtonClasses } from '@mui/material';
import { useAuthenticationContext } from '../auth/authenticationProvider';
interface Menu {
  menu: IMenuProp[]
}
export const Sidebar: React.FC<Menu> = (prop) => {
  const location=useLocation();
  const {current}=useAuthenticationContext();
  console.log(current);
  
  const navigation=useNavigate();
  const [openLogout,setOpenLogout]=React.useState(false);
  return (
    <Paper
      className="bg-light-subtle "
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton  color="primary">
          <Abc />
        </IconButton>
        <Typography ><span className='text-info'>Ed</span> Health</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px'
          }}
        >
          {
            prop.menu.map(data => {
              return <ListItem key={data.link}>
                <ListItemButton className={location.pathname==data.link?'border-0 border-bottom border-3 border-info':''} onClick={()=>navigation(data.link)} selected={location.pathname==data.link?true:false}>
                   {data.icon}
                    <Typography sx={{fontSize:''}}>{data.name}</Typography>
                 </ListItemButton>
              </ListItem>
            })
          }
        </List>
        <List
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton onClick={()=>navigation("/setting")}>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flex: 1, gap: 1, alignItems: 'center' }}>
        <Avatar src={current.photo} sx={{width:30,height:30}}/>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography   overflow={'hidden'}>{current.name}</Typography>
          <Typography   overflow={'hidden'}>{current.email}</Typography>
        </Box>
        <IconButton onClick={()=>setOpenLogout(true)}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
      <Dialog maxWidth='xs'  open={openLogout} className="rounded-0 p-2">
       <div className='p-2'>
       Are you sure you want to log out?
        <div className="modal-footer">
            <Button onClick={()=>setOpenLogout(false)}>No</Button>
            <Button onClick={()=>setOpenLogout(false)}>Yes</Button>
        </div>
       </div>
    </Dialog>
    </Paper>
  );
}
