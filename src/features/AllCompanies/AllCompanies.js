import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AdminDashboard } from "../../components/AdminDashboard";
import {
  Box,
  Container,
  Grid,
  Link,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import UpdateCompanie from "./UpdateCompanie";
import { useNavigate } from "react-router-dom";

export const AllCompanies = () => {
  const [company, setCompany] = useState([]);
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
          if (role === "Normal") {
            navigate("/user");
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
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/company/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result.company);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const deleteCompany = (id) => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8000/api/company/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
        // setTrip(trips.filter(item => item.id !== id));
      })
      .catch((error) => console.log("error", error));
  };

  return (
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid>
            <Grid>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <h1>Companies</h1>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Joined Date</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Update</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {company?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.joinedDate}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>
                          <UpdateCompanie id={item.id} />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => deleteCompany(item.id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link className="d-grid gap-2" href="/create-companie">
                  <Button variant="warning" size="lg">
                    Create
                  </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
