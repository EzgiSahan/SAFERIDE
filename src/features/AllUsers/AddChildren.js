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
import { UserDashboard } from "../../components/UserDashboard";

export const AddChildren = () => {

  const [children, setChildren] = useState([]);
  const [user, setUser] = useState([]);

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
        .then((result) => {
          setUser(result.user);
          const id = result.user.id;
          
          const childAccessToken = localStorage.getItem("accessToken");
          var childHeaders = new Headers();
          childHeaders.append("Authorization", `Bearer ${childAccessToken}`);

          var childRequestOptions = {
            method: "GET",
            headers: childHeaders,
            redirect: "follow",
          };
          fetch(
            `http://localhost:8000/api/children/user/${id}`,
            childRequestOptions
          )
            .then((response) => response.json())
            .then((result) => {
                setChildren(result.children);
                console.log(result);
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
                  {/* <TableCell>Update</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.isArray(children) && children.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
