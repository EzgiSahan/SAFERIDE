import { Container, Navbar, Nav } from 'react-bootstrap'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

export function NavBar() {
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    Transporation App
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin">Home</Nav.Link>
                        <Nav.Link href="/admin-profile">Profile</Nav.Link>
                    </Nav>
                    <Tooltip title="Account settings">
                        <IconButton>
                            <AccountCircleIcon size={100}></AccountCircleIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Translate this page">
                        <IconButton>
                            <GTranslateIcon size={100}></GTranslateIcon>
                        </IconButton>
                    </Tooltip>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}
