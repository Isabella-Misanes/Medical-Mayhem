import { Box, Button, Grid, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
    const navigate = useNavigate();

    const homeButtons = {
        color: 'black',
        bgcolor: 'white',
        ":hover": {
            bgcolor: '#e5e5e5'},
    }
    return (
        <div id="home-screen">
            <Sidebar />
            <Box
                sx={{
                    height: '95%',
                    minWidth: '350px',
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '2%',
                    paddingTop: '2%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '5%',
                    top: '5%',
                    boxShadow: '10'
                }}>
                <Typography variant="h2" color="red" gutterBottom>Medical Mayhem</Typography>
                
                <Grid container spacing={4}>
                    <Grid item xs={12} sx={{
                        textAlign: 'center',
                    }}>
                        <Button id = "play-button" 
                        sx={[homeButtons, {
                            fontSize: '24pt',
                            marginLeft: '-10%',
                        }]}
                            onClick={()=>{navigate("/game")}}>
                            Play
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{
                        textAlign: 'center',
                    }}>
                        <Button id = "map-search-button" 
                        sx={homeButtons}
                            onClick={()=>{navigate("/mapsearch")}}>
                            Map Search
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id = "map-builder-button" 
                        sx={homeButtons}
                            onClick={()=>{navigate("/mapbuilder")}}>
                            Map Builder
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{
                        textAlign: 'center'
                    }}>
                        <Button id = "social-button" 
                        sx={homeButtons}
                            onClick={()=>{navigate("/social")}}>
                            Social
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id = "forums-button"  
                        sx={homeButtons}
                            onClick={()=>{navigate("/forum")}}>
                            Forums
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{
                        textAlign: 'center',
                    }}>
                        <Button id = "profile-button"   
                        sx={homeButtons}
                            onClick={()=>{navigate("/profile")}}>
                            Profile
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id = "settings-button" 
                        sx={homeButtons}
                            onClick={()=>{navigate("/settings")}}>
                            Settings
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{
                        textAlign: 'center',
                    }}>
                        <Button id = "about-button" 
                        sx={homeButtons}
                            onClick={()=>{navigate("/about")}}>
                            About
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id = "leaderboard-button"
                        sx={homeButtons}
                            onClick={()=>{navigate("/leaderboard")}}>
                            Leaderboard
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}