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
                            onClick={()=>{navigate("/mapsearch")}}>
                            Map Search
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/mapbuilder")}}>
                            Map Builder
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/social")}}>
                            Social
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/forum")}}>
                            Forums
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/profile")}}>
                            Profile
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/settings")}}>
                            Settings
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/about")}}>
                            About
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={()=>{navigate("/leaderboard")}}>
                            Leaderboard
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}