import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const defaultTheme = createTheme();


export const ResetPasswordFail = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/login')
    };

    return (
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
                        <Avatar sx={{ m: 1, bgcolor: '#dc3545' }}>
                            <HighlightOffIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Error Occurred!
                        </Typography>
                        <Typography className='text-center' component="h1" variant="h6">
                            Your password couldn't be reset. Please try again later!
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                                Go Back to Login
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Footer/>
        </>  
    )
}