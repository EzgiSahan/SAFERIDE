import React, { useState } from 'react';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { IconButton, Typography } from '@mui/material';

export const TripSeats = ({data,children,changeSeats}) => {

    const seats = data == "empty" ? {} : JSON.parse(data.seats);
    seats[20] = "asdff";
    const [selectedSeats, setSelectedSeats] = useState(seats);
    const [seatCounter, setSeatCounter] = useState(0);
    
  return (
    <div className='container'>
        <div className='row'>
        {/* <AirlineSeatReclineNormalIcon  sx={{color:'#007bff',marginLeft:2,height:'100px',width:'100px'}}/> */}
        <Typography variant='h6' marginTop={4}>
                Choose the bus seats that are suitable for you
        </Typography>
        <Typography marginTop={2}>
            <AirlineSeatReclineNormalIcon sx={{color:'#757575'}}/> - Available
            <AirlineSeatReclineNormalIcon sx={{marginLeft:3, color:'#9C27B0'}}/> - Reserved
            <AirlineSeatReclineNormalIcon sx={{ marginLeft:3, color:'#1876D1'}}/> -  Selected


        </Typography>
        <Typography marginTop={4} marginBottom={5} minWidth={460} maxWidth={460} overflow={'scroll'} className='border rounded-3 border-dark p-3'>
            { selectedSeats !== {} &&
               Object.keys(selectedSeats).map((item)=>(
                <>
                    {
                        item >20 ? 
                        <IconButton sx={{marginTop:3}} onClick={(e)=>{
                            if(seats[item].length == 0){
                                if(selectedSeats[item].length == 0 && seatCounter <children.length){
                                    selectedSeats[item] = children[seatCounter].id;
                                    setSeatCounter(seatCounter+1);
                                    changeSeats(selectedSeats,seatCounter-1)

                                }
                                else if(selectedSeats[item].length > 0 && seatCounter >=children.length){
                                    selectedSeats[item] = "";
                                    setSeatCounter(seatCounter-1);
                                    changeSeats(selectedSeats,seatCounter+1)
                                }
                            }
                            return selectedSeats;
                       }} aria-label="fingerprint" color={seats[item].length>0 ? "danger": selectedSeats[item].length > 0 ? "primary":"dark"}>
                        <AirlineSeatReclineNormalIcon />
                        </IconButton>
                        :
                        <IconButton onClick={(e)=>{
                            if(seats[item].length == 0){
                                if(selectedSeats[item].length == 0 && seatCounter <children.length){
                                    selectedSeats[item] = children[seatCounter].id;
                                    setSeatCounter(seatCounter+1);
                                    changeSeats(selectedSeats,seatCounter+1)

                                }
                                else if(selectedSeats[item].length > 0 && seatCounter >=children.length){
                                    selectedSeats[item] = "";
                                    setSeatCounter(seatCounter-1);
                                    changeSeats(selectedSeats,seatCounter-1)
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
        </div>
    </div>
  )
}
