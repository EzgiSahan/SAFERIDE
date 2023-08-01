import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/UpdateModal";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import { array } from "../AllUsers/Array";

export const AllTrips = () => {
  let navigate = useNavigate();

  const [trip, setTrip] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


fetch("http://localhost:8000/api/users", requestOptions)
  .then(response => response.json())
  .then(result => {setTrip(result.users)})
  .catch(error => console.log('error', error));
  }, [])


  function deleted(id) {
    var index = array
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    array.splice(index, 1);

    navigate("/all-trips");
  }
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
                        <h1>All Trips</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Started Date</TableCell>
                                    <TableCell>Bus ID</TableCell>
                                    <TableCell>Driver ID</TableCell>
                                    <TableCell>Passenger</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trip.map((item) => (
                                <TableRow>
                                    <TableCell>{item.date_started}</TableCell>
                                    <TableCell>{item.bus_id}</TableCell>
                                    <TableCell>{item.bus_driver_id}</TableCell>
                                    <TableCell>{item.passenger}</TableCell>
                                    <TableCell><UpdateModal /></TableCell>
                                    <TableCell><Button
                                    onClick={() => deleted(item.id)}
                                    variant="danger">
                                        Delete
                                    </Button></TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                        <Link className="d-grid gap-2" to='/create-user'>
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
