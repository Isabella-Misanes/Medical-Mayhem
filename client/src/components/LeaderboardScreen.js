import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function LeaderboardScreen() {
    return (
        <div id="about-screen">
            <Sidebar/>
            <Box
                sx={{
                    height: '90%',
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '25%'
                }}>
                <Typography variant="h4" gutterBottom>Leaderboard Screen</Typography>
            </Box>
            <BackButton />
        </div>
    );
}