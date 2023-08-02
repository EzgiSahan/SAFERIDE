import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validateEmail } from '../../utils/validateEmail';
import { validatePassword } from '../../utils/validatePassword';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

export const Signup = () => {
    const [name,setName] = useState('');
    const [surname, setSurname] = useState('');
    const [country, setCounrty] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password,
            "role": role,
            "country": country,
            "city": city,
            "address": address,
            "birthdate": birthDate
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:8000/api/users", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        navigate('/admin')
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="FirstName"
                        required
                        fullWidth
                        id="FirstName"
                        label="First Name"
                        onChange={(e)=>{
                            setName(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="LastName"
                        label="Last Name"
                        name="LastName"
                        onChange={(e)=>{
                            setSurname(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="Country"
                        required
                        fullWidth
                        id="Country"
                        label="Country"
                        onChange={(e)=>{
                            setCounrty(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="City"
                        label="City"
                        name="City"
                        onChange={(e)=>{
                            setCity(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="Adress"
                        label="Address"
                        name="Adress"
                        onChange={(e)=>{
                            setAddress(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="Phone"
                        required
                        fullWidth
                        type='tel'
                        id="Phone"
                        label="Phone"
                        onChange={(e)=>{
                            setPhone(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="BirthDate"
                        label="Birth Date"
                        name="BirthDate"
                        onChange={(e)=>{
                            setBirthDate(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="Email"
                        label="Email Address"
                        name="Email"
                        onChange={(e)=>{
                            setEmailError(validateEmail(e));
                            setEmail(e.target.value);
                            }}/>{emailError && <h6>{emailError}</h6>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="Eassword"
                        label="Password"
                        type="Password"
                        id="Password"
                        onChange={(e)=>{
                            setPasswordError(validatePassword(e));
                            setPassword(e.target.value);
                            }}/>{passwordError && <h6>{passwordError}</h6>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="Role"
                        label="Role"
                        name="Role"
                        onChange={(e)=>{
                            setRole(e.target.value);}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."/>
                    </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="sign-in" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            </Container>
        </ThemeProvider>
        <Footer/>
    </>
  )
}