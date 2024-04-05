import { Box, Avatar, Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export default function SocialCard(props) {
    return (
        <Box sx={{
            width: '15%',
            height: '30%',
            bgcolor: 'yellow',
            position: 'absolute',
            top: props.top,
            left: props.left,
            boxShadow: 5
        }}>
            <Avatar sx={{ width: 130, height: 130, margin: 'auto', marginTop: '5px' }} />
            <Grid>
                <CircleIcon style={{color: 'lime'}} />
                <h1 style={{marginLeft: '15px'}}>Friend</h1>
            </Grid>
            
        </Box>
    );
}