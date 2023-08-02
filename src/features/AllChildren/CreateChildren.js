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

export const CreateChildren = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/children/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
	  navigate("/all-children");
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
                  Create Children
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
                  </Grid>
                  <Button variant="primary" type="submit">
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
