import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function SettingsScreen() {
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
            <BackButton />
        </div>
    );
}