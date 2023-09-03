/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../../components/TwoSidedLayout';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export const Home = () =>  {
    const navigate = useNavigate();
    
  return (
    <>
        <Navbar/>
        <TwoSidedLayout reversed>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                Move your kids safely with Safe Ride!
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Bus Transportation Service that you can depend on. Providing convenience for you and your family! <br />
                Sign up now to benefit from our services.
            </Typography>
            <Button
                size="lg"
                endDecorator={<ArrowForward fontSize="xl" />}
                sx={{ mt: 2, mb: 1 }}
                onClick={() =>navigate('/signup')}
            >
                Get Started
            </Button>
            <Typography>
                Already a member? <Link href="/login"  fontWeight="lg">Login</Link>
            </Typography>
        </TwoSidedLayout>
        <Footer/>
    </>
  );
}
