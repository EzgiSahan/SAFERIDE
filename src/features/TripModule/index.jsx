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

export const BusRegisteration = () => {
  const [children,setChildren] = useState([]);
  const [selectedChildren,setSelectedChildren] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);  
  const steps = [
    {
      label: 'Choose the children that will go on the trip',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Choose your trip ',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Choose your seats',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
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

  
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE2NTU0NTAsImV4cCI6MTY5MTY2MjY1MH0.8urBktJE-Zv7u_7nQNtkrTci6H4Q8DOzgkhMLhg9I7w");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/children/user/22413b8e-dde5-4f0b-ad00-62da1a7953a9", requestOptions)
      .then(response => response.json())
      .then(result =>{
        setChildren(result.children);

      })
      .catch(error => console.log('error', error));

  }, [])
  
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
              <Grid xs={12} lg={6} >
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
                <TripCard/>
              </Grid>
            }   
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
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
      </Paper>
    )}

                <Typography paddingLeft={3} paddingTop={3} fontWeight={500} variant="h6" >
                </Typography>
       


              </Grid>
              <Grid xs={12} lg={6}>
              {/* {
                selectedChildren.map((selected)=>{
                  <TripTicket>

                  </TripTicket>
                }) 
              } */}

              
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
