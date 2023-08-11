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
  
  export const CreateBus = () => {
    const [busDriverId, setBusDriverId] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [model, setModel] = useState("");
  
    const [company, setCompany] = useState([]);
    const [busDriver, setBusDriver] = useState([]);
  
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
  
        fetch("http://localhost:8000/api/company/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setCompany(result.company);
          })
          .catch((error) => {
            console.log("Error fetching bus information:", error);
          });

          var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
  
        fetch("http://localhost:8000/api/busDriver", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setBusDriver(result.busDriver);
            console.log(result)
          })
          .catch((error) => {
            console.log("Error fetching bus information:", error);
          });
      }
      else{
        navigate('/login')
      }
  }, []);
  
  
    const handleSubmit = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        model: model,
        companyId: companyId,
        busDriverId: busDriverId 
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch("http://localhost:8000/api/bus/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      navigate("/all-buses");
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
                    Create Bus
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="Model"
                        label="Model"
                        name="Model"
                        onChange={(e) => {
                          setModel(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Bus Driver
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(e) => {
                              setBusDriverId(e.target.value);
                            }}
                            label="Bus Driver"
                          >
                            {busDriver?.map((item) => (
                              <MenuItem value={item.id}>
                                {item.id} {item.lastName}
                              </MenuItem>
                            ))} 
                          </Select>
                        </FormControl>
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
                            label="Company"
                          >
                            {company?.map((item) => (
                              <MenuItem value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))} 
                          </Select>
                        </FormControl>
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
  