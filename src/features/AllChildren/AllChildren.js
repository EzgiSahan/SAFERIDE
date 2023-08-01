import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/UpdateModal";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import { array } from "../AllUsers/Array";

export const AllChildren = () => {
  let navigate = useNavigate();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmRiZDMyZGItNjc5NC00MWUyLWJiZjktODVmMDBlMTQ5Y2VkIiwidXNlcl9uYW1lIjoiYW1tYXIiLCJ1c2VyX2VtYWlsIjoiYW1tYXIzMjFAZ21haWwuY29tIiwiaWF0IjoxNjkwODA1NDM2LCJleHAiOjE2OTA4MDkwMzZ9.dxynAWO6vMin0nQJOajqsXdwdGQ45ifHgNY2_CCHmOQ");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/users", requestOptions)
    .then(response => response.json())
    .then(result => {setChildren(result.users)})
    .catch(error => console.log('error', error));
  }, [])

  function deleted(id) {
    var index = array
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    array.splice(index, 1);

    navigate("/all-children");
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
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                        <h1>All Children</h1>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {children.map((item) => (
                                <TableRow>
                                    <TableCell>{item.children_name}</TableCell>
                                    <TableCell>{item.children_surname}</TableCell>
                                    <TableCell>{item.children_email}</TableCell>
                                    <TableCell>{item.children_phone}</TableCell>
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
        </Container>
      </Box>
    </Box>
  );
};
