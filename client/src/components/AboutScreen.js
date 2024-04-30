import { Box, Divider, Typography } from '@mui/material';
import BackButton from './BackButton';

export default function AboutScreen() {
    return (
        <div id="about-screen">
            <Box sx={{
                height: '90%',
                width: '45%',
                flexDirection: 'column',
                backgroundColor: '#fffbc3',
                position: 'absolute',
                left: '27.5%',
                top: '3%',
                textAlign: 'center',
                p: 2,
                boxShadow: 10
            }}/>
            <Box
                sx={{
                    height: '85%',
                    width: '40%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '30%',
                    top: '5%',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: 10
                }}>
                <Typography variant="h4" gutterBottom>About Screen</Typography>
                <Divider />
                <p>Medical Mayhem is a top down 2-D multiplayer game created by:</p>
                <p>
                    Thomas Aloi<br/>
                    Torin McNally<br/>
                    Isabella Misanes<br/>
                    Jared Tjahjadi<br/>
                </p>
            </Box>
            <BackButton />
        </div>
    );
}