import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import UpdateChildModal from "../../components/UpdateChildModal";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Box, Container, Grid, TextField, Toolbar } from "@mui/material";
import { Button } from "react-bootstrap";

export const AdminProfile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCounrty] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState("");

  let navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/admin");
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
          <img
            src="https://reactjs.org/logo-og.png"
            alt="profile"
            className="profile-img"
          ></img>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="First Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Country"
                  required
                  fullWidth
                  id="Country"
                  label="Country"
                  onChange={(e) => {
                    setCounrty(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="City"
                  label="City"
                  name="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Adress"
                  label="Address"
                  name="Adress"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Phone"
                  required
                  fullWidth
                  type="tel"
                  id="Phone"
                  label="Phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="BirthDate"
                  label="Birth Date"
                  name="BirthDate"
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  onChange={(e) => {
                    setEmailError(validateEmail(e));
                  }}
                />
                {emailError && <h6>{emailError}</h6>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Eassword"
                  label="Password"
                  type="Password"
                  id="Eassword"
                  onChange={(e) => {
                    setPasswordError(validatePassword(e));
                  }}
                />
                {passwordError && <h6>{passwordError}</h6>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
          <UpdateChildModal />
        </Container>
      </Box>
    </Box>
  );
};
