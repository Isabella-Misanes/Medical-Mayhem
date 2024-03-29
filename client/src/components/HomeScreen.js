import { Box, Button, Grid, Typography } from '@mui/material';
import * as Constants from '../constants'
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen({setCurrScreen}) {
    const navigate = useNavigate();
    return (
        <div id="home-screen">
            <Sidebar />
            <Box
                sx={{
                    height: '100%',
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '2%',
                    backgroundColor: 'white',
                    position: 'absolute',
                }}>
                <Typography variant="h2" gutterBottom>Medical Mayhem</Typography>
                <Typography variant="h5" gutterBottom>Home Screen</Typography>
                
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Button
                            onClick={()=>{navigate("/game")}}>
                            Play
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.MAP_SEARCH_SCREEN)}}>
                            Map Search
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.MAP_BUILDER_SCREEN)}}>
                            Map Builder
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.SOCIAL_SCREEN)}}>
                            Social
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.FORUM_SCREEN)}}>
                            Forums
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.PROFILE_SCREEN)}}>
                            Profile
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.SETTINGS_SCREEN)}}>
                            Settings
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.ABOUT_SCREEN)}}>
                            About
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{setCurrScreen(Constants.LEADERBOARD_SCREEN)}}>
                            Leaderboard
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}