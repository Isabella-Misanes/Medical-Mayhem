import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'

export default function WelcomeScreen({setCurrScreen}) {
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
                    onClick={()=>{}}>
                    Register as New User
                </Button>
                <Button></Button>
                <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '300px',
                        left: '2%'
                    }]}
                    onClick={()=>{}}>
                    Log In
                </Button>
                <Button></Button>
                <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '300px',
                        left: '2%'
                    }]}
                    onClick={()=>{
                        console.log(setCurrScreen);
                        setCurrScreen(Constants.HOME_SCREEN);
                        }}>
                    Continue as Guest
                </Button>
            </Box>
        </div>
    )
}