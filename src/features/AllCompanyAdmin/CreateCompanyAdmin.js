import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { Button, ThemeProvider } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../../components/AdminDashboard";
const defaultTheme = createTheme();

export const CreateCompanyAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [company, setCompany] = useState([]);
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

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/company/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCompany(result.company);
        })
        .catch((error) => {
          console.log("Error fetching bus information:", error);
        });
    }
  }, []);

  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      country: country,
      city: city,
      address: address,
      birthdate: birthdate,
      role: role,
      password: password,
      companyId: companyId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/companyAdmin/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    navigate("/all-companyAdmin");
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
                  Create Company Admin
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="Departure Date"
                        required
                        fullWidth
                        id="FirstName"
                        label="First Name"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Last Name"
                        required
                        fullWidth
                        id="LastName"
                        label="Last Name"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="LAst Name"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="LAst Name"
                        required
                        fullWidth
                        id="password"
                        type={password}
                        label="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="LAst Name"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Arrival Date"
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Destination"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="Country"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="City"
                        required
                        fullWidth
                        id="birthDate"
                        label="Birth Date"
                        onChange={(e) => {
                          setBirthdate(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="role"
                        required
                        fullWidth
                        id="role"
                        label="Role"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Company
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => {
                            setCompanyId(e.target.value);
                          }}
                          label="Bus"
                        >
                          {company.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
