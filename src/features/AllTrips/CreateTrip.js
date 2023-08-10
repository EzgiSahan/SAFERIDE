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

export const CreateTrip = () => {
  const [date, setDate] = useState("");
  const [busId, setBusId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [passenger, setPassenger] = useState("");
  const [bus, setBus] = useState([]);

  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);


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
            navigate('/user');
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

      fetch("http://localhost:8000/api/bus/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setBus(result.bus);
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
      date: date,
      busId: busId,
      driverId: driverId,
      passenger: [passenger],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/trips/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    navigate("/all-trips");
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
                  Create Trip
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="Date"
                        required
                        fullWidth
                        id="JoinDate"
                        label="Join Date"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Bus
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => {
                            setBusId(e.target.value);
                            setDriverId(e.target.value);
                          }}
                          label="Bus"
                        >
                          {bus.map((item) => (
                            <MenuItem value={item.bus_id}>
                              {item.bus_model}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="Passenger"
                        label="Passenger"
                        name="Passenger"
                        onChange={(e) => {
                          setPassenger(e.target.value);
                        }}
                      />
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
