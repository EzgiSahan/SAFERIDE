import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateBuses from "./UpdateBuses";

export const AllBuses = () => {

  const [bus, setBus] = useState([]);
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
            
            if (role === 'Normal') {
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
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://localhost:8000/api/bus", requestOptions)
        .then(response => response.json())
        .then(result => {
            setBus(result.bus);
            console.log(result.bus)
        })
        .catch(error => console.log('error', error));
    }
}, []);

  const deleteTrip = (id) => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);


    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/bus/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        window.location.reload();
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
                        <h1>Buses</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                  <TableCell>Model</TableCell>
                                    <TableCell>Company Id</TableCell>
                                    <TableCell>Bus Driver Id</TableCell>
  
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bus?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.model}</TableCell>
                                    <TableCell>{item.companyId}</TableCell>
                                    <TableCell>{item.busDriverId}</TableCell>
                                    <TableCell><UpdateBuses id={item.id}/></TableCell>
                                    <TableCell>
                                      <Button variant="danger" onClick={() => deleteTrip(item.id)}>
                                        Delete
                                      </Button>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                        <Link className="d-grid gap-2" href='/create-bus'>
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
