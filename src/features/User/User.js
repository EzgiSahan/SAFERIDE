import { Box, Container, TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDashboard } from "../../components/UserDashboard";


export const User = () => {

  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate()

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
          console.log(data)
          setUserInfo(data);
          const role = data.user.role;
          console.log(role);
          if(role === "Admin") {
            navigate('/admin')
          }
        })
        .catch((error) => {
          localStorage.clear();
          navigate('/login');
        });
    } 
  }, []);

  return (
    <>
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
          <Container>
            <div className="profile-div">
              <img
                src="https://reactjs.org/logo-og.png"
                alt="profile"
                className="profile-img"
              ></img>
              <div className="user-info-container">
              {userInfo && (
              <div className="user-info-container">
                <p>First Name: {userInfo.firstName}</p>
                <p>Last Name: {userInfo.lastName}</p>
                <p>Email Address: {userInfo.email}</p>
                <p>Contact Number: {userInfo.phone}</p>
              </div>
            )}
              </div>
            </div>
          </Container>
        </Box>
      </Box>
    </>
  );
};
