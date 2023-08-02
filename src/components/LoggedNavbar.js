import React from 'react'
import '../assets/styles/Styles.css'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CommuteIcon from '@mui/icons-material/Commute';
import BusinessIcon from '@mui/icons-material/Business';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';

export const UserNavbar = (
    <React.Fragment>
        <ListItemButton href='/user'>
            <ListItemIcon>
                    <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton href='/user-profile'>
            <ListItemIcon>
                <PeopleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton href='/login'>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItemButton>
    </React.Fragment>
);

export const AdminNavbar = (
    <React.Fragment>
        <ListItemButton href='/admin'>
                <ListItemIcon>
                    <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton href='/admin-profile'>
                <ListItemIcon>
                    <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        <ListItemButton href='/users'>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton href='/children'>
            <ListItemIcon>
                <FamilyRestroomIcon />
            </ListItemIcon>
            <ListItemText primary="Children" />
        </ListItemButton>
        <ListItemButton href='/trips'>
            <ListItemIcon>
                <CommuteIcon />
            </ListItemIcon>
            <ListItemText primary="Trips" />
        </ListItemButton>
        <ListItemButton href='/companies'>
            <ListItemIcon>
                <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Companies" />
        </ListItemButton>
        <ListItemButton href='/login'>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
    </React.Fragment>
);
