import { Box, Container, Toolbar,Grid, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserDashboard } from "../../components/UserDashboard";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TripTicket from './common/TripTicket';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { TripCard } from "./common/TripCard";
import { TripSeats } from "./common/TripSeats";
import { useNavigate } from "react-router-dom";

export const BusRegisteration = () => {
  const [children,setChildren] = useState([]);
  const [selectedChildren,setSelectedChildren] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);  
  const [trips,setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [userData,setUserData] = useState({})
  let navigate = useNavigate();
  const steps = [
    {
      label: 'Choose the children that will go on the trip',
    },
    {
      label: 'Choose your trip ',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Choose your seats',
    },
  ];


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const onFinish = (childId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "type": "Booking",
      "tripId": selectedTrip.id,
      "childId": childId,
      "userId": userData.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/transactions/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE2NTU0NTAsImV4cCI6MTY5MTY2MjY1MH0.8urBktJE-Zv7u_7nQNtkrTci6H4Q8DOzgkhMLhg9I7w");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/children/user/6b67fd53-5d15-43a6-9a8c-ce06760b12dc", requestOptions)
      .then(response => response.json())
      .then(result =>{
        setChildren(result.children);

      })
      .catch(error => console.log('error', error));

  }, []);

  useEffect(() => {
      var myHeaders = new Headers();

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/api/trips/", requestOptions)
        .then(response => response.json())
        .then(result => {
            setTrips(result.trips);
            console.log(result);
        })
        .catch(error => console.log('error', error));
  }, []);

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
            
            if (role === 'Normal') {
                navigate('/user');
            }
            
            console.log(role);
            setUserData(data.user);
        })
        .catch((error) => {
            console.error("Error fetching user information:", error);
        });
      }
      else{
        navigate('/user');
      }
    },[])
  function onTripCardClick(data) {
    setSelectedTrip(data);
  }
  function onChangeSeats(data,count){
    setSelectedSeats(data);
    setSelectedSeatsCount(count);
  }
  
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
            <Grid sx={{backgroundColor:'#fff',paddingBottom:5,paddingRight:5, marginTop:3,width:'auto',borderRadius:2,marginLeft:2}} container>
            <Grid xs={12} >
                <Typography paddingLeft={3} paddingTop={3} fontWeight={700} variant="h4" >
                   Trip registration
                </Typography>
              </Grid>
              <Grid xs={12} lg={7} >
              <Stepper sx={{paddingLeft:4, paddingTop:4}} activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {index === 0 &&                 
                    <Autocomplete
                          sx={{paddingLeft:1,paddingBottom:2,paddingTop:3,width:'auto',}}
                          multiple
                          id="tags-outlined"
                          value={selectedChildren}
                          options={children}
                          getOptionLabel={(option) => option.firstName +" "+option.lastName}
                          onChange={(event, newValue) =>{
                            setSelectedChildren(newValue);
                        }}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Filter Children"
                              placeholder="Children"
                            />
                          )}
                      />
                    }
                    {
                      index === 1 && 
                      <Grid sx={{height:400, overflow:'scroll'}}>
                        { trips != undefined ? trips.map((trip)=>(
                        <TripCard selectedCard={selectedTrip} onTripCardClick={onTripCardClick} data={trip}/>
                        ))
                        :
                          <Typography>
                            There are currently no trips available at the moment
                          </Typography>

                        }
                      </Grid>
                    }   
                    {
                      index === 2 &&
                      <TripSeats changeSeats={onChangeSeats} children={selectedChildren.length === 0 ? "empty" : selectedChildren} data={Object.keys(selectedTrip).length == 0 ? "empty" : selectedTrip}/>
                    }
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={index === 0 ? selectedChildren.length === 0 : index === 1 ? Object.keys(selectedTrip).length == 0 : index === 2 && selectedSeatsCount === 0 }
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
                <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                            Book tickets
                        </Button>
              </Paper>
            )}
              </Grid>
              <Grid borderLeft={1} borderColor={'gray'} paddingLeft={3} xs={12} lg={5} marginTop={3}>
                <Typography variant="h5" className="mb-5" fontWeight={600}>Your Children's Tickets</Typography>
                {
                  selectedChildren.map((item)=>(

                    <TripTicket child={item} trip={selectedTrip}/>

                  ))
                }
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
