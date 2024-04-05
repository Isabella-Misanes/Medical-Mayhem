import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function MapBuilderScreen() {
    return (
        <div id="map-builder-screen">
            <Box sx={{
                bottom: '2.5%',
                left: '10%',
                height: '80%',
                width: '80%',
                position: 'absolute',
                backgroundImage: 'url("https://github.com/Isabella-Misanes/cse-332-datasets/blob/main/Level_Builder.png?raw=true")',
                backgroundSize: '100%'
            }}/>
            <Box sx={{
                top: '0%',
                left: '0%',
                height: '90%',
                width: '100%',
                position: 'absolute',
                backgroundImage: 'url("https://github.com/Isabella-Misanes/cse-332-datasets/blob/main/Toolbar.png?raw=true")',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat'
            }}/>
            <Sidebar/>
            <BackButton />
        </div>
    );
}