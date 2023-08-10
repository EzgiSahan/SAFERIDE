import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export function TripCard() {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 'fit-content',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
      
      
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <Typography bgcolor={'#1876D1'} sx={{color:"#fff"}} fontSize={24} fontWeight={600}>
            A101
        </Typography>
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          Yosemite Park
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            sx={{ color: 'text.tertiary' }}
            
          >
            California, USA
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          Cool weather all day long
        </Chip>
      </CardContent>
    </Card>
  );
}