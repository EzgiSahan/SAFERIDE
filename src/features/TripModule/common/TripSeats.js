import React, { useState } from 'react';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { IconButton, Typography } from '@mui/material';

export const TripSeats = ({data,children}) => {

    const seats = data == "empty" ? {} : JSON.parse(data.seats);
    seats[20] = "asdff";
    const [selectedSeats, setSelectedSeats] = useState(seats);
    const [seatCounter, setSeatCounter] = useState(0);
    console.log(seatCounter);

    const IsBooked = ()=>{

    }
  return (
    <div className='container'>
        <div className='row'>
        {/* <AirlineSeatReclineNormalIcon  sx={{color:'#007bff',marginLeft:2,height:'100px',width:'100px'}}/> */}
        <Typography marginTop={4} marginBottom={5} width={460} overflow={'scroll'} className='border border-dark p-3'>
            { selectedSeats !== {} &&
               Object.keys(selectedSeats).map((item)=>(
                <>
                    {
                        item >20 ? 
                        <IconButton sx={{marginTop:3}} onClick={(e)=>{
                            if(seats[item].length == 0){
                                if(selectedSeats[item].length == 0 && seatCounter <2){
                                    selectedSeats[item] = "bedany";
                                    setSeatCounter(seatCounter+1);
                                }
                                else if(selectedSeats[item].length > 0 && seatCounter >=2){
                                    selectedSeats[item] = "";
                                    setSeatCounter(seatCounter-1);
                                }
                            }
                            return selectedSeats;
                       }} aria-label="fingerprint" color={seats[item].length>0 ? "danger": selectedSeats[item].length > 0 ? "primary":"dark"}>
                        <AirlineSeatReclineNormalIcon />
                        </IconButton>
                        :
                        <IconButton onClick={(e)=>{
                            if(seats[item].length == 0){
                                if(selectedSeats[item].length == 0 && seatCounter <2){
                                    selectedSeats[item] = "bedany";
                                    setSeatCounter(seatCounter+1);
                                }
                                else if(selectedSeats[item].length > 0 && seatCounter >=2){
                                    selectedSeats[item] = "";
                                    setSeatCounter(seatCounter-1);
                                }
                            }
                            return selectedSeats;
                       }} aria-label="fingerprint" color={ seats[item].length>0 ? "secondary": selectedSeats[item].length > 0 ? "primary":"dark"}>
                        <AirlineSeatReclineNormalIcon />
                        </IconButton>
                    }

               </>
               ))
            }
        {/* <AirlineSeatReclineNormalIcon sx={{color:'#000',height:'40px',width:'40px'}}/> */}


        </Typography>
        <Typography>
        <IconButton onClick={(e)=>{
        }}>
        <AirlineSeatReclineNormalIcon />

        </IconButton>
        </Typography>

        </div>


        

    </div>
  )
}
