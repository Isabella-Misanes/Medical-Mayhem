import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../App';
import { useState } from 'react';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { store } = useContext(GlobalStoreContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const homeButtons = {
        color: 'black',
        bgcolor: 'white',
        ":hover": {
            bgcolor: '#e5e5e5'},
    }

    function handleInviteModalOpen() {
        setModalOpen(true);
    };

    function handleInviteModalClose() {
        setModalOpen(false);
    };

    function handleAcceptInvite(event) {
        store.acceptInvite(event);
        handleInviteModalClose();
    }

    function handleRejectInvite(event) {
        store.rejectInvite(event);
        handleInviteModalClose();
    }

    return (
        <div id="home-screen">
            <Sidebar />
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
                    top: '7.5%',
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
                        <Button onClick={handleInviteModalOpen} 
                            sx={[buttonStyle, {
                                color: 'white',
                                width: '25%',
                        }]}>
                            Invite
                        </Button>
                    </Grid>
                </Grid>

                <Modal
                    open={isModalOpen}
                    onClose={handleInviteModalClose}
                >
                    <Box sx={{
                        width: '30%',
                        height: '40%',
                        bgcolor: '#4D9147',
                        top: '20%',
                        left: '30%',
                        position: 'absolute',
                        boxShadow: 10,
                        textAlign: 'center',
                        borderRadius: '16px',
                        color: 'white'
                    }}>
                        <h1>Game Invitation</h1>
                        <Divider />
                        <Box sx={{
                            bgcolor: '#e3e3e3',
                            width: '100%',
                            height: '60%',
                            alignContent: 'center',
                            textAlign: 'center',
                            color: 'black'
                        }}>
                            <p><strong>McKillaGorilla</strong> has invited you to their party.</p>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <Button sx={[buttonStyle, {color: 'white'}]}
                                        onClick={(event) => {handleAcceptInvite(event)}}>
                                        Accept
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button sx={{
                                        bgcolor: 'red',
                                        color: 'white'
                                    }}
                                        onClick={(event) => {handleRejectInvite(event)}}>
                                        Reject
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}