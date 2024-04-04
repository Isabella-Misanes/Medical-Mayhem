import { Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

export default function GameScreen() {
    const navigate = useNavigate();
    return (
        <div id="about-screen">
            <Sidebar/>
            <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
            <Typography variant="h4" gutterBottom>Game Screen</Typography>
            <BackButton />
        </div>
    );
}