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

	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY");
		
		var requestOptions = {
		  method: 'GET',
		  headers: myHeaders,
		  redirect: 'follow'
		};
		
		fetch("http://localhost:8000/api/bus/", requestOptions)
		  .then(response => response.json())
		  .then(result => {setBus(result.bus)})
		  .catch(error => console.log('error', error));
	}, [])
 
	const handelSubmit = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		
		var raw = JSON.stringify({
		  date: date,
		  busId: busId,
		  driverId: driverId,
		  passenger: [passenger]
		});
		
		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};
		
		fetch("http://localhost:8000/api/trips/", requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
		navigate('/all-trips')
	}

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
				  <Box component="form" onSubmit={handelSubmit} sx={{ mt: 3 }}>
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
						<InputLabel id="demo-simple-select-label">Bus</InputLabel>
						<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						onChange={(e) => {
							setBusId(e.target.value);
							setDriverId(e.target.value);
						}}
						label="Bus">
							{bus.map((item) => (
								<MenuItem value={item.bus_id}>{item.bus_model}</MenuItem>
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
  