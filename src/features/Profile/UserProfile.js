import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import UpdateChildModal from "../../components/UpdateChildModal";
import { Box, Container, Grid, TextField, Toolbar,Button} from "@mui/material";
import { UserDashboard } from "../../components/UserDashboard";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const UserProfile = ({id}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCounrty] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [value, setValue] = useState('');


  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(birthDate);
  

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
    else{
      navigate("/login");
    }
  }, []);

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        firstName: name,
        lastName: surname,
        phone: phone,
        country: country,
        city: city,
        address: address,
        birthdate: birthDate
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(`http://localhost:8000/api/users/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      const role = result.user.role;
      console.log(role)
      if(role === 'Admin'){
        navigate('/admin');
      }
      console.log(result)
    })
    .catch(error => {localStorage.clear();
    navigate('/user');});
  }


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
          height: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 3, marginLeft:5,width:'fit-content' ,p:3 ,mb: 4,backgroundColor:"white" }}>
        <h3>User Profile</h3>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="First Name"
                  value={name}
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
                  value={surname}
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
                  value={country}
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
                  value={city}
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
                  value={address}
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
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TextField
                  required
                  fullWidth
                  id="BirthDate"
                  label="Birth Date"
                  name="BirthDate"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                /> */}
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{width:'100%'}} onChange={(newValue)=>{
                            setValue(newValue);
                            setBirthDate(newValue.$d.toISOString().slice(0, 19).replace("T", " "));
                            }} label="Birth Date" />
                      </LocalizationProvider>
              </Grid>
            </Grid>
            <div className="submit-cont">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, width:'20%',alignContent: 'center'}}
            >
              Update
            </Button>
            </div>
            
          </Box>
        </Container>     

        <Container maxWidth="lg" sx={{ mt: 3,marginLeft:5,width:'auto' ,p:3 ,mb: 4,backgroundColor:"white" }}>
        <h3>Reset Password</h3>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
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
              </Grid> */}
              <Grid item xs={6}>
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
                {passwordError && <h6 style={{color:'red'}}>{passwordError}</h6>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Eassword"
                  label="Confirm Password"
                  type="Password"
                  id="Eassword"
                  onChange={(e) => {
                    setPasswordError(validatePassword(e));
                  }}
                />
                {passwordError && <h6 style={{color:'red'}}>{passwordError}</h6>}
              </Grid>
              
            </Grid>
            <div className="reset-cont">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, width:'20%',alignContent: 'center',fontWeight:'bold'}}
            >
              Reset
            </Button>
            </div>
            
          </Box>
          {/* <UpdateChildModal /> */}
        </Container>  
      </Box>
    </Box>
  );
};
