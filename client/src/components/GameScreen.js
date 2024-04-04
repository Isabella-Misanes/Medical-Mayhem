import { Typography } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function GameScreen() {
    return (
        <div id="about-screen">
            <Sidebar/>
            <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
            <Typography variant="h4" gutterBottom>Game Screen</Typography>
            <BackButton />
        </div>
    );
}