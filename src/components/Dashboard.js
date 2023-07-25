import React from 'react'
import '../assets/styles/Styles.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CommuteIcon from '@mui/icons-material/Commute';
import BusinessIcon from '@mui/icons-material/Business';

export function Dashboard() {
    return (
        <Sidebar style={{ height: "100vh" }}>
            <Menu>
                <MenuItem icon={<MenuIcon />}>User</MenuItem>
                <MenuItem component={<Link to="/user" />} icon={<HomeOutlinedIcon />}>Home</MenuItem>                    
                <MenuItem component={<Link to="/user-profile" />} icon={<PeopleOutlinedIcon/>}> Profile </MenuItem>
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

export function AdminDashboard() {
    return (
        <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem icon={<MenuIcon />}>Admin</MenuItem>
                    <MenuItem component={<Link to="/admin" />} icon={<HomeOutlinedIcon />}>Home</MenuItem>                    
                    <MenuItem component={<Link to="/admin-profile" />} icon={<PeopleOutlinedIcon/>}> Profile </MenuItem>
                    <SubMenu label="About">
                        <MenuItem component={<Link to="/all-users" />} icon={<PeopleIcon/>}>All Users</MenuItem>
                        <MenuItem component={<Link to="/all-children" />} icon={<FamilyRestroomIcon/>}>All Children</MenuItem>
                        <MenuItem component={<Link to="/all-trips" />} icon={<CommuteIcon/>}>All Trips</MenuItem>
                        <MenuItem component={<Link to="/all-companies" />} icon={<BusinessIcon/>}>All Companies</MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="url" />} icon={<SettingsIcon />}>Settings</MenuItem>
                    <MenuItem component={<Link to="url" />} icon={<LogoutIcon/>}>Logout</MenuItem>
                </Menu>
        </Sidebar>
    )
}
