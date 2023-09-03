import {
  Box,
  Container,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../../components/AdminDashboard";

export const Admin = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("http://localhost:8000/api/users/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUserData(result.user);
        const role = result.user.role;
        console.log(role);
        if (role === "Normal") {
          navigate("/user");
        }
      })
      .catch((error) => console.log("error", error));
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
        <AdminDashboard />
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
              {userData && (
                <div className="user-info-container">
                  <p>First Name: {userData.firstName}</p>
                  <p>Last Name: {userData.lastName}</p>
                  <p>Email Address: {userData.email}</p>
                  <p>Contact Number: {userData.phone}</p>
                </div>
              )}
            </div>
          </Container>
        </Box>
      </Box>
    </>
  );
};
