import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
import UpdateChildren from "../AllChildren/UpdateChildren";
import { UserDashboard } from "../../components/UserDashboard";

export const AddChildren = () => {
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
          const id = data.user.id;  
          const childAccessToken = localStorage.getItem("accessToken");
          var childHeaders = new Headers();
          childHeaders.append("Authorization", `Bearer ${childAccessToken}`);
  
          var childRequestOptions = {
            method: "GET",
            headers: childHeaders,
            redirect: "follow",
          };
          fetch(`http://localhost:8000/api/children/${id}`, childRequestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (Array.isArray(result)) {
                setChildren(result);
              } else {
                console.log("Children data is not an array:", result);
              }
            })
            .catch((error) => console.log("error", error));
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);
  

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
      <UserDashboard />
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
                    <TableCell></TableCell>
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
