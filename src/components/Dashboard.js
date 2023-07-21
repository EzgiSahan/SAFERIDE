import React from 'react'
import '../assets/styles/Styles.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export function Dashboard() {
    return (
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem icon={<MenuIcon />}>
                    <h2>Admin</h2>
                    </MenuItem>
                    <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>                    
                    <MenuItem component={<Link to="url" />} icon={<PeopleOutlinedIcon/>}> Profile </MenuItem>
                    <SubMenu label="About">
                        <MenuItem component={<Link to="url" />} icon={<PeopleOutlinedIcon/>}> Members </MenuItem>
                        <MenuItem component={<Link to="url" />} icon={<PeopleOutlinedIcon/>}> Members </MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="url" />} icon={<LogoutIcon/>}>Logout</MenuItem>
                    <MenuItem component={<Link to="url" />} icon={<SettingsIcon />}>Settings</MenuItem>
                </Menu>
            </Sidebar>
    )
}

