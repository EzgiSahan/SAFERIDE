import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import Logo from '../assets/images/logo-no-background.png';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor:'#FFFF', padding:1}} position="static">
        <Toolbar >
        <img style={{padding:5,width:'100px', height:'auto'}} src={Logo}/>
        <Typography variant="h6" component="div" sx={{ color:'black',flexGrow: 1 }}>  </Typography>
          <Button onClick={() =>navigate('/signup')} sx={{marginRight:2}} color="primary">Sign up</Button>
          <Button onClick={() =>navigate('/login')} color="primary" variant="soft"> Login </Button>
          <LanguageIcon  sx={{color:'#007bff',marginLeft:2,height:'30px',width:'30px'}}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}