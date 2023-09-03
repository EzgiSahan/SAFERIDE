import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';

const defaultTheme = createTheme();

export const SetNewPassword = () => {

    const getCharacterValidationError = (str) => {
        return `${str}`;
    };
    const formSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is mendatory')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[a-z]/, getCharacterValidationError('Password must include one lowercase'))
          .matches(/[A-Z]/, getCharacterValidationError('Password must include one uppercase'))
          .matches(/[[0-9]/, getCharacterValidationError('Password must include one number'))
          .matches(/[^\w]/, getCharacterValidationError('Password must include one special symbol')),
        confirmPwd: Yup.string()
          .required('Password is mendatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState
    const navigate = useNavigate();

    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        navigate('/reset-password-success');
        return false
    }

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
                        alignItems: 'center',}}>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockResetIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Set New Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                {...register('password')} 
                                type="password"
                                autoComplete="password"
                                autoFocus/>
                                {errors.password?.message}
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPwd"
                                label="Confirm Password"
                                {...register('confirmPwd')} 
                                type="password"
                                id="password"
                                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                                autoComplete="current-password"/>
                                {errors.confirmPwd?.message}
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
