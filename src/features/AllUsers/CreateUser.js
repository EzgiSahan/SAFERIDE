import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { Button, ThemeProvider } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../../components/AdminDashboard";
import { validateEmail } from "../../utils/validateEmail";
const defaultTheme = createTheme();

export const CreateUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const [emailError, setEmailError] = useState("");


  let navigate = useNavigate();

  const handelSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: password,
      role: role,
      country: country,
      city: city,
      address: address,
      birthdate: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:8000/api/users/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    navigate("/all-users");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <AdminDashboard />
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Create User
                </Typography>
                <Box component="form" onSubmit={handelSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="FirstName"
                        required
                        fullWidth
                        id="FirstName"
                        label="First Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="LastName"
                        label="Last Name"
                        name="LastName"
                        onChange={(e) => {
                          setSurname(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Phone"
                        required
                        fullWidth
                        type="tel"
                        id="Phone"
                        label="Phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="Email"
                        label="Email Address"
                        name="Email"
                        onChange={(e) => {
                          setEmailError(validateEmail(e));
                          setEmail(e.target.value);
                        }}
                      />
                      {emailError && <h6>{emailError}</h6>}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Password"
                        required
                        fullWidth
                        type={'password'}
                        id="Password"
                        label="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Role"
                        required
                        fullWidth
                        id="Role"
                        label="Role"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Country"
                        required
                        fullWidth
                        id="Country"
                        label="Country"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="City"
                        required
                        fullWidth
                        id="City"
                        label="City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Address"
                        required
                        fullWidth
                        id="Address"
                        label="Address"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="BirthDate"
                        required
                        fullWidth
                        id="BirthDate"
                        label="Birth Date"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button variant="primary" type="submit" size="lg">
                    Create
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};
