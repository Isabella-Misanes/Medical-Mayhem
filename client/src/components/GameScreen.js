import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'

export default function GameScreen({setCurrScreen}) {
    return (
        <div id="about-screen">
            <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
            <Typography variant="h4" gutterBottom>Game Screen</Typography>
            <Button variant="contained"
                sx={[buttonStyle, {
                    left: '2%',
                    bottom: '2%',
                    position: 'absolute'
                }]}
                onClick={()=>{setCurrScreen(Constants.HOME_SCREEN)}}>
                Back
            </Button>
        </div>
    );
}