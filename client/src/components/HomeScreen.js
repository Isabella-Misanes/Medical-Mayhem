import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../App';
import InviteModal from './InviteModal';
import { useContext, useEffect, useState } from 'react';
import ReportModal from './ReportModal';
import MessagesDrawer from './MessagesDrawer';
import AuthContext, { UserRoleType } from '../auth';
import SocketEvents from '../constants/socketEvents'
import loading from '../assets/loading.gif'
import socket from '../constants/socket';

// Styling
const homeButtons = {
    color: 'black',
    bgcolor: 'white',
    ":hover": {bgcolor: '#e5e5e5'}
}

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 3
};

export default function HomeScreen() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [queueingUp, setQueueingUp] = useState(false)
    
    function handleInviteButtonClick() {
        setShowInviteModal(true);
    }

    function handlePlayButtonClick() {
        // setQueueingUp(true)
        // socket.emit(SocketEvents.QUEUE_UP)
        navigate('/game')
    }

    // useEffect(() => {

    //     socket.on(SocketEvents.MATCH_FOUND, () => {
            
    //         // Make sure to turn off event listeners before navigating to different
    //         // screens in order to avoid unexpected behaviors
    //         socket.off(SocketEvents.MATCH_FOUND)
    //         navigate('/game')
    //     })
    //     // eslint-disable-next-line
    // }, [])

    return (
        <div id="home-screen">
            <Box
                sx={{
                    height: '90%',
                    minWidth: '400px',
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '2%',
                    paddingTop: '2%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '5%',
                    bottom: '0%',
                    boxShadow: '10'
                }}>
                <Typography variant="h2" color="red" gutterBottom>Medical Mayhem</Typography>
                
                <Grid container spacing={4}>
                    <HomeButton
                        xs={12} id='play-button'
                        gridSx={{textAlign: 'center'}}
                        buttonSx={[homeButtons, {fontSize: '24pt', marginLeft: '-10%'}]}
                        // onClick={() => navigate('/game')}
                        onClick={handlePlayButtonClick}
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
                        backgroundColor='transparent'
                        buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                        text='Character Builder'
                        disable={auth.role === UserRoleType.GUEST}
                    />
                    <HomeButton
                        gridSx={{textAlign: 'center'}}
                        id='social-button'
                        onClick={() => navigate('/social')}
                        buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                        text='Social'
                        disable={auth.role === UserRoleType.GUEST}
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
                        buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                        text='Profile'
                        disable={auth.role === UserRoleType.GUEST}
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
            {queueingUp && <QueueModal queuingUp={queueingUp} setQueueingUp={setQueueingUp}/>}
            <InviteModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />               
            <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />               
        </div>
    )
}

function HomeButton(props) {
    return (
        <Grid item xs={props.xs} sx={props.gridSx}>
            <Button id={props.id} onClick={props.onClick} sx={props.buttonSx} disabled={props.disable}>
                {props.text}
            </Button>
        </Grid>
    )
}

function QueueModal(props) {
    // const { auth } = useContext(AuthContext);

    const modalText = "Waiting for another player..."
    // const [modalText, setModalText] = useState("Waiting for another player...")
    // const [matchFound, setMatchFound] = useState(false)

    function handleXButtonClick() {
        props.setQueueingUp(false)
        socket.emit(SocketEvents.LEAVE_QUEUE)
    }

    return (
        <Modal
            open={props.queuingUp}
            aria-labelledby="modal-find-game"
            id="queue-modal"
        >
            <Box
                sx={modalStyle}>
                <Button 
                    sx={{
                    color: 'black',
                    ":hover":{
                        bgcolor: '#f1f9f4'
                        }
                    }}
                    onClick={handleXButtonClick}
                >
                    X
                </Button>
                <br></br>
                <Typography id="modal-find-game" variant="h6" component="h2">
                    {modalText}
                </Typography>
                {/* {matchFound ? (
                    countdownModal
                ) : ( */}
                    <img src={loading} alt='loading-gif' className="image"></img>
                {/* )} */}
            </Box>
        </Modal>
    )
}


// Default params for the xs and buttonSx properties of the HomeButton
HomeButton.defaultProps = { xs: 6, buttonSx: homeButtons }