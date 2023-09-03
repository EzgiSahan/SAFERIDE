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
import { React, useEffect, useState } from "react";
import { Button, ThemeProvider } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../../components/AdminDashboard";
import { validateEmail } from "../../utils/validateEmail";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const defaultTheme = createTheme();

export const CreateCompanie = () => {
  const [name, setName] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState('');
  const [emailError, setEmailError] = useState("");
  const [userData, setUserData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const role = data.user.role;
          if (role === "Normal") {
            navigate("/user");
          }
          console.log(role);
          setUserData(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  const handelSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      joinedDate: joinedDate,
      email: email,
      phone: phone,
      country: country,
      city: city,
      address: address,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/company/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
    navigate("/all-companies");
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
                  Create Company
                </Typography>
                <Box component="form" onSubmit={handelSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="FirstName"
                        required
                        fullWidth
                        id="FirstName"
                        label="Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{width:'100%'}} onChange={(newValue)=>{
                            setValue(newValue);
                            setJoinedDate(newValue.$d.toISOString().slice(0, 19).replace("T", " "));
                            }} label="Joined Date" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Email"
                        required
                        fullWidth
                        type="Email"
                        id="Email"
                        label="Email"
                        onChange={(e) => {
                          setEmailError(validateEmail(e));
                          setEmail(e.target.value);
                        }}
                      />
                      {emailError && <h6>{emailError}</h6>}
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
                        type="City"
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
                  </Grid>
                  <Button className="mt-3 mb-5 w-100" variant="primary" type="submit">
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
