import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'

export default function HomeScreen({setCurrScreen}) {
    return (
        <div id="home-screen">
            <Box
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
                    onClick={()=>{setCurrScreen(Constants.WELCOME_SCREEN)}}>
                    Play
                </Button>
            </Box>
        </div>
    )
}