import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/UpdateModal";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import { array } from "../AllUsers/Array";

export const AllCompanies = () => {
  let navigate = useNavigate();
  const [company, setCompany] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/api/users", requestOptions)
      .then(response => response.json())
      .then(result => {setCompany(result.users)})
      .catch(error => console.log('error', error));
  
  }, [])
  
  function deleted(id) {
    var index = array
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    array.splice(index, 1);

    navigate("/all-companies");
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
                        <h1>All Companies</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Joined Date</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {company.map((item) => (
                                <TableRow>
                                    <TableCell>{item.company_name}</TableCell>
                                    <TableCell>{item.date_joined}</TableCell>
                                    <TableCell>{item.company_email}</TableCell>
                                    <TableCell>{item.company_phone}</TableCell>
                                    <TableCell>{item.company_role}</TableCell>
                                    <TableCell>{item.company_country}</TableCell>
                                    <TableCell>{item.company_city}</TableCell>
                                    <TableCell>{item.company_address}</TableCell>
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
