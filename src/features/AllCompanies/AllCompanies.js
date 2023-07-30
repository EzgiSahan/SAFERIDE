import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/UpdateModal";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, Link, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import { array } from "../AllUsers/Array";

export const AllCompanies = () => {
  let navigate = useNavigate();

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
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {array.map((item) => (
                                <TableRow>
                                    <TableCell>{item.Name}</TableCell>
                                    <TableCell>{item.Surname}</TableCell>
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.Phone}</TableCell>
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
