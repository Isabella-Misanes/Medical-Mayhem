import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

export default function WelcomeScreen() {
    const navigate = useNavigate();
    const { store } = useContext(GlobalStoreContext);

    return (
        <div id="welcome-screen">
            <Box id="title-banner"
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
                
                <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '300px',
                        left: '2%'
                    }]}
                    onClick={() => { navigate("/register") }}>
                    Register as New User
                </Button>
                <br />
                <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '300px',
                        left: '2%'
                    }]}
                    onClick={()=>{ navigate("/login") }}>
                    Log In
                </Button>
                <br />
                <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '300px',
                        left: '2%'
                    }]}
                    onClick={()=>{ store.loginGuest() }}>
                    Continue as Guest
                </Button>
            </Box>
        </div>
    );
}