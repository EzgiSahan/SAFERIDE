import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import { UserDashboard } from "../../components/UserDashboard";

export const User = () => {
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
                <p>First Name</p>
                <p>Last Name</p>
                <p>Email Adress</p>
                <p>Contact Number</p>
              </div>
            </div>
          </Container>
        </Box>
      </Box>
    </>
  );
};
