import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import UpdateTrip from "./UpdateTrip";
import { useNavigate } from "react-router-dom";

export const AllTrips = () => {

  const [trips, setTrip] = useState([]);
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
          console.log(data)
          const role = data.user.role;
          if(role === 'Normal'){
            navigate('/user')
          }
          console.log(role);
          setUserData(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    } 
  }, []);
  
  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://localhost:8000/api/trips", requestOptions)
    .then(response => response.json())
    .then(result => {setTrip(result.trips)})
    .catch(error => console.log('error', error));
  }, [])

  const deleteTrip = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/trips/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        window.location.reload();
        // setTrip(trips.filter(item => item.id !== id));
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900], }}>
      <AdminDashboard />
      <Box
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}>
            <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid>
                <Grid>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                        <h1>Trips</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Started Date</TableCell>
                                    <TableCell>Bus ID</TableCell>
                                    <TableCell>Passenger</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trips?.map((item) => (
                                <TableRow key={item.trip_id}>
                                    <TableCell>{item.date_started}</TableCell>
                                    <TableCell>{item.bus_id}</TableCell>
                                    <TableCell>{item.passenger}</TableCell>
                                    <TableCell><UpdateTrip id={item.trip_id}/></TableCell>
                                    <TableCell>
                                      <Button variant="danger" onClick={() => deleteTrip(item.trip_id)}>
                                        Delete
                                      </Button>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                        <Link className="d-grid gap-2" href='/create-trip'>
                            <Button variant="warning" size="lg">Create</Button>
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
      </Box>
    </Box>
  );
};
