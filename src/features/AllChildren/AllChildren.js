import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AdminDashboard } from "../../components/AdminDashboard";
import {
  Box,
  Container,
  Link,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import UpdateChildren from "./UpdateChildren";
import { useNavigate } from "react-router-dom";

export const AllChildren = () => {
  const [children, setChildren] = useState([]);
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
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch("http://localhost:8000/api/children/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setChildren(result.children);
        })
        .catch((error) => {
          console.log("Error fetching children:", error);
        });
    }
  }, []);
  
  const deleteChildren = (id) => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8000/api/children/${id}`, requestOptions)
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
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <h1>Children</h1>
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
                {children?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <UpdateChildren id={item.id} />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteChildren(item.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Link className="d-grid gap-2" href="/create-children">
              <Button variant="warning" size="lg">
                Create
              </Button>
            </Link>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
