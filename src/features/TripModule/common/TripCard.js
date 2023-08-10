import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export function TripCard({data,onTripCardClick,selectedCard}) {

  function formatISODateToYYYYMMDDHHMM(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 'fit-content',
        margin:2,
        '&:hover': { boxShadow: 'md', borderColor: '#1876D1' },
        bgcolor: '#fff',
        borderColor: selectedCard.id == data.id && '#1876D1',
        borderWidth: selectedCard.id == data.id && '2px'
      }}
      onClick={()=>{onTripCardClick(data)}}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <Typography bgcolor={'#1876D1'} sx={{color:"#fff"}} fontSize={24} fontWeight={600}>
            {data.code ? data.code : "-"}
        </Typography>
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
        {data.destination ? data.destination : "-"}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            sx={{ color: 'text.tertiary' }}
            
          >
                    {data.city ? data.city : "-"},        {data.country ? data.country : "-"}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none'}}
        >
          Departure : {" "} 
          {data.departureDate ? formatISODateToYYYYMMDDHHMM(data.departureDate) : "-"}
        </Chip>
        <Chip
          variant="outlined"
          color="danger"
          size="sm"
          sx={{ pointerEvents: 'none', marginTop:1 }}
        >
          Arrival : {" "} 
          {data.arrivalDate ? formatISODateToYYYYMMDDHHMM(data.arrivalDate) : "-"}
        </Chip>
      </CardContent>
    </Card>
  );
}