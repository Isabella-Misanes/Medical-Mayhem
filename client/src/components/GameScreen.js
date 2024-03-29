import { Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function GameScreen({setCurrScreen}) {
    const navigate = useNavigate();
    return (
        <div id="about-screen">
            <Sidebar/>
            <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
            <Typography variant="h4" gutterBottom>Game Screen</Typography>
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