import { Box, Button, Grid, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../App';
import InviteModal from './InviteModal';
import { useState } from 'react';
import ReportModal from './ReportModal';
import MessagesDrawer from './MessagesDrawer';

const homeButtons = {
    color: 'black',
    bgcolor: 'white',
    ":hover": {bgcolor: '#e5e5e5'}
}

export default function HomeScreen() {
    const navigate = useNavigate();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    
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
                    <HomeButton
                        xs={12} id='play-button'
                        gridSx={{textAlign: 'center'}}
                        buttonSx={[homeButtons, {fontSize: '24pt', marginLeft: '-10%'}]}
                        onClick={() => navigate('/game')}
                        text='Play'
                    />
                    <HomeButton
                        gridSx={{textAlign: 'center'}}
                        id='map-search-button'
                        onClick={() => navigate('/mapsearch')}
                        text='Map Search'
                    />
                    <HomeButton
                        id='map-builder-button'
                        onClick={() => navigate('/mapbuilder')}
                        text='Map Builder'
                    />
                    <HomeButton
                        gridSx={{textAlign: 'center'}}
                        id='social-button'
                        onClick={() => navigate('/social')}
                        text='Social'
                    />
                    <HomeButton
                        id='forums-button'
                        onClick={() => navigate('/forum')}
                        text='Forums'
                    />
                    <HomeButton
                        gridSx={{textAlign: 'center'}}
                        id='profile-button'
                        onClick={() => navigate('/profile')}
                        text='Profile'
                    />
                    <HomeButton
                        id='settings-button'
                        onClick={() => navigate('/settings')}
                        text='Settings'
                    />
                    <HomeButton
                        gridSx={{textAlign: 'center'}}
                        id='about-button'
                        onClick={() => navigate('/about')}
                        text='About'
                    />
                    <HomeButton
                        id="leaderboard-button"
                        onClick={() => navigate("/leaderboard")}
                        text='Leaderboard'
                    />
                    <HomeButton
                        id='map-search-button'
                        onClick={handleInviteButtonClick}
                        buttonSx={[buttonStyle, {color: 'white', width: '25%'}]}
                        text='Invite'
                    />
                    <HomeButton
                        onClick={() => navigate("/reports")}
                        buttonSx={[buttonStyle, {color: 'white'}]}
                        text='Reports'
                    />
                </Grid>
            </Box>
            <MessagesDrawer />
            <Sidebar />
            <InviteModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />               
            <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />               
        </div>
    )
}

function HomeButton(props) {
    return (
        <Grid item xs={props.xs} sx={props.gridSx}>
            <Button id={props.id} onClick={props.onClick} sx={props.buttonSx}>
                {props.text}
            </Button>
        </Grid>
    )
}

// Default params for the xs and buttonSx properties of the HomeButton
HomeButton.defaultProps = { xs: 6, buttonSx: homeButtons }