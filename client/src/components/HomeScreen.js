import { Box, Button, Grid, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../App';
import InviteModal from './InviteModal';
import { useState } from 'react';
import ReportModal from './ReportModal';
import MessagesDrawer from './MessagesDrawer';

export default function HomeScreen() {
    const navigate = useNavigate();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const homeButtons = {
        color: 'black',
        bgcolor: 'white',
        ":hover": {
            bgcolor: '#e5e5e5'},
    }
    
    function handleInviteButtonClick() {
        setShowInviteModal(true);
    }

    return (
        <div id="home-screen">
            <Box
                sx={{
                    height: '90%',
                    minWidth: '350px',
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '2%',
                    paddingTop: '2%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '5%',
                    top: '7%',
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
                    <Grid item xs={6}>
                        <Button onClick={handleInviteButtonClick} 
                            sx={[buttonStyle, {
                                color: 'white',
                                width: '25%',
                        }]}>
                            Invite
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {navigate("/reports")} } 
                            sx={[buttonStyle, { color: 'white' }]}>
                            Reports
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <MessagesDrawer />
            <Sidebar />
            <InviteModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />               
            <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />               
        </div>
    )
}