import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function GameScreen() {
    return (
        <div id="about-screen">
            <Box sx={{
                bgcolor: 'black',
                width: '100%',
                height: '100%',
                position: 'absolute'
            }}>
                <Box sx={{
                    top: '5%',
                    left: '5%',
                    height: '90%',
                    width: '90%',
                    position: 'absolute',
                    backgroundImage: 'url("https://github.com/Isabella-Misanes/cse-332-datasets/blob/ad4555391416e53e3c3dffd89ed692dcb6c11030/Welcome_Screen.png?raw=true")',
                    backgroundSize: '100%'
                }}/>
            </Box>
            <Sidebar/>
            <BackButton />
        </div>
    );
}