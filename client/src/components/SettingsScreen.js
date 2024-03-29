import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function SettingsScreen({setCurrScreen}) {
    const navigate = useNavigate();
    return (
        <div id="settings-screen">
            <Sidebar/>
            <Box
                sx={{
                    height: '90%',
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '25%'
                }}>
                <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
                <Typography variant="h4" gutterBottom>Settings Screen</Typography>
            </Box>
            <Button variant="contained"
                sx={[buttonStyle, {
                    left: '2%',
                    bottom: '2%',
                    position: 'absolute'
                }]}
                onClick={()=>{navigate("/home")}}>
                Back
            </Button>
        </div>
    );
}