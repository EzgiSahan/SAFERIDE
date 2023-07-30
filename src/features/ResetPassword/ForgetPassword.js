import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export const ForgetPassword = () => {

    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/reset-password')
    };
    
    return(
        <>
            <Navbar/>
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forget Password?
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e)=>{
                            setEmail(e.target.value);}}
                        autoFocus/>    
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                            Submit
                        </Button>        
                    </Box>
                </Box>
            </Container>
            </ThemeProvider>
            <Footer/>
        </>
    )
}

{/* <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <div>
                    <h1>Forget Password?</h1>
                    <h4>We'll send you reset instructions.</h4>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type={email} class="form-control" id="email" placeholder='email' required 
                    onChange={(e)=>{
                        setEmail(e.target.value);}}/>
                </div>
                    <button type="submit" class="btn btn-primary" id="button">Reset Password</button>
                </form>
            </div>
        </div> */}