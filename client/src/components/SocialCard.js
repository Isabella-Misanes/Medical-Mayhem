import { Box, Avatar, Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export default function SocialCard(props) {
    return (
        <Box onClick={props.handleProfileMenuOpen} sx={{
            width: '15%',
            height: '30%',
            bgcolor: 'yellow',
            position: 'absolute',
            top: props.top,
            left: props.left,
            boxShadow: 5,
            cursor: 'pointer'
        }}>
            <Avatar sx={{ width: 150, height: 150, margin: 'auto', marginTop: '5px' }} />
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <CircleIcon sx={{color: 'lime', marginLeft:'10px'}} />
                </Grid>
                <Grid item>
                    <h2 style={{marginLeft: '10px'}}>Friend</h2>
                </Grid>
            </Grid>
        </Box>
    );
}