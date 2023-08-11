import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
export default function TripTicket({child,trip}) {
  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 370  }}>
      <CardOverflow>
        <AspectRatio color='info' ratio="1" sx={{ width: 110 }}>
          <DirectionsBusIcon/>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
        {trip.destination}
        </Typography>
        <Typography level="body-sm"> Passenger: <b>{child.firstName + " " + child.lastName}</b>
        </Typography>
        <Typography level="body-sm" fontWeight={600}>{Object.keys(trip).length >0  ? (trip.city+ ", "+ trip.country) : ""}</Typography>


      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        Ticket
      </CardOverflow>
    </Card>
  );
}
