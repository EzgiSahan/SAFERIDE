import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import UpdateUser from "./UpdateUser";

export const AllUsers = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmRiZDMyZGItNjc5NC00MWUyLWJiZjktODVmMDBlMTQ5Y2VkIiwidXNlcl9uYW1lIjoiYW1tYXIiLCJ1c2VyX2VtYWlsIjoiYW1tYXIzMjFAZ21haWwuY29tIiwiaWF0IjoxNjkwODA1NDM2LCJleHAiOjE2OTA4MDkwMzZ9.dxynAWO6vMin0nQJOajqsXdwdGQ45ifHgNY2_CCHmOQ");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://localhost:8000/api/users/", requestOptions)
    .then(response => response.json())
    .then(result => {
      setUser(result.users)
    })
    .catch(error => console.log('error', error));
  }, []);

  const deleteUser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/users/${id}`, requestOptions)
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
                        <h1>Users</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Birth Date</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.map((item) => (
                                <TableRow key={item.user_id}> 
                                    <TableCell>{item.user_name}</TableCell>
                                    <TableCell>{item.user_surname}</TableCell>
                                    <TableCell>{item.user_email}</TableCell>
                                    <TableCell>{item.user_phone}</TableCell>
                                    <TableCell>{item.user_role}</TableCell>
                                    <TableCell>{item.user_country}</TableCell>
                                    <TableCell>{item.user_city}</TableCell>
                                    <TableCell>{item.user_address}</TableCell>
                                    <TableCell>{item.user_birthdate}</TableCell>
                                    <TableCell><UpdateUser id={item.user_id} /></TableCell>
                                    <TableCell><Button 
                                      onClick={() => 
                                        deleteUser(item.user_id)
                                          
                                      }
                                      variant="danger">
                                      Delete
                                    </Button></TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                        <Link className="d-grid gap-2" href='/create-user'>
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
