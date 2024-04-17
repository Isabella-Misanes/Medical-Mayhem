import { Box, Button, Divider, Grid, Menu, MenuItem, Modal, Typography, TextField } from '@mui/material';
import { buttonStyle } from '../App';
import Sidebar from './Sidebar';
import GlobalStoreContext from '../store';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ReportModal, BackButton } from '.';
import SocialCard from './SocialCard';
import MUIErrorModal from './MUIErrorModal';

export default function SocialScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [friends, setFriends] = useState([]);
    const [friendNames, setFriendNames] = useState([]);
    const [friendOnlineStatuses, setFriendOnlineStatuses] = useState([]);
    const [friendPfps, setFriendPfps] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [showReportModal, setShowReportModal] = useState(false);
    const [currFriend, setCurrFriend] = useState('');
    // Add friend modal functionality
    const [addFriendUsername, setAddFriendUsername] = useState('');

    function handleButtonClick(buttonId) { setActiveButton(buttonId); };

    useEffect(() => {
        switch(activeButton) {
            case 0:
                store.viewFriends();
                break;
            case 1:
                store.showRecentPlayers();
                break;
            case 2:
                store.showSentRequests();
                break;
            case 3:
                store.showReceivedRequests();
                break;
            default:
                // store.viewFriends();
                // break;
        }
        // Having the below dependency as [activeButton, store] causes it to spam
        // eslint-disable-next-line
    }, [activeButton]);

    useEffect(() => {
        // Checking if store.profileInfo.friends exists fixes the error of the friends state being undefined upon load
        setFriends(store.profileInfo.friends ? store.profileInfo.friends : [])
        setFriendNames(store.profileInfo.friendNames ? store.profileInfo.friendNames : [])
        setFriendOnlineStatuses(store.profileInfo.friendOnlineStatuses ? store.profileInfo.friendOnlineStatuses : [])
        setFriendPfps(store.profileInfo.friendPfps ? store.profileInfo.friendPfps : [])
        // eslint-disable-next-line
    }, [store.profileInfo])

    function handleFriendModalOpen() { setModalOpen(true); }
    function handleFriendModalClose() { setModalOpen(false); }

    const renderButton = (buttonNum, str) => {
        return (
            <Button 
                onClick={() => {handleButtonClick(buttonNum)}}
                sx={{color: activeButton === buttonNum ? 'red' : 'black'}}
            >
                {str}
            </Button>
        )
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const friendRender = () => {
        const friendCards = [];
        if(friends.length !== 0) {
            for(let i = 0; i < friends.length; i++) {
                friendCards.push(
                    <SocialCard
                        key={i}
                        top={`${25 + Math.floor(i / 5) * 32.5}%`}
                        left={`${5 + ((i % 5) * 17.5)}%`}
                        friend={friends[i]}
                        friendName={friendNames[i]}
                        friendOnlineStatus={friendOnlineStatuses[i]}
                        friendPfp={friendPfps[i]}
                        onClick={(event) => {
                            handleProfileMenuOpen(event);
                            setCurrFriend(friendNames[i]);
                        }}
                    />
                )
            }
        }
        else {
            friendCards.push(
                <Box key={'no-friends'} sx={{
                    width: '90%',
                    height: '50%',
                    bgcolor: 'white',
                    position: 'absolute',
                    top: '30%',
                    left: '5%',
                    boxShadow: 5
                }}>
                    <h1>No Friends</h1>
                </Box>
            )
        }
        return friendCards;
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handlePrivateMessaging(event) {
        store.openPrivateMessaging(event);
        handleMenuClose();
    }

    // TODO: Display modal to confirm user wants to remove friend
    // TODO: Handle friend list updating once user removes friend (i dread dealing with useEffect tho...)
    function handleRemoveFriend(event, targetUsername) {
        console.log(targetUsername);
        store.removeFriend(targetUsername);
        handleMenuClose();
    }

    function handleReportPlayer(event) {
        setShowReportModal(true);
        handleMenuClose();
    }

    const partyMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top',horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={(event) => {handlePrivateMessaging(event)}}>
                Private Message
            </MenuItem>
            <MenuItem onClick={(event) => {handleRemoveFriend(event, currFriend)}}>
                Remove Friend
            </MenuItem>
            <MenuItem onClick={(event) => {handleReportPlayer(event)}}>
                Report Player
            </MenuItem>
        </Menu>
    );

    // Add friend
    const handleSubmit = (event) => {
        event.preventDefault();
        store.sendFriend(addFriendUsername, handleFriendModalClose);
        // TODO: Handle module change to confirm that a friend request was sent
    };

    const handleAddFriendUsernameChange = (event) => {
        event.preventDefault();
        setAddFriendUsername(event.target.value);
    }

    let modal = store.errorMessage !== "" ? <MUIErrorModal store={store} /> : "";
    
    return (
        <div id="social-screen">
            <Box sx={{
                height: '85%',
                width: '85%',
                flexDirection: 'column',
                backgroundColor: '#626262',
                position: 'absolute',
                textAlign: 'center',
                top: '5%',
                left: '2.5%',
                p: 2,
                boxShadow: 10
            }} />
            <Box
                sx={{
                    height: '80%',
                    width: '82.5%',
                    flexDirection: 'column',
                    backgroundColor: '#BA7943',
                    position: 'absolute',
                    textAlign: 'center',
                    top: '7.5%',
                    left: '3.75%',
                    p: 2,
                    marginRight: '10%',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={2} sx={{
                        bgcolor: 'white',
                        m: 2,
                        pr: 2,
                        width: 'fit-content',
                        height: 'fit-content',
                        boxShadow: 5
                    }}>
                        <Typography variant="h4" gutterBottom>Social</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{mt: 2}}>
                        <Button 
                            variant='contained' 
                            sx={buttonStyle}
                            onClick={handleFriendModalOpen}
                        >
                            Add Friend
                        </Button>
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={3}>
                        <Box sx={{
                            bgcolor: 'white',
                            mt: 2,
                            mb: 2,
                            ml: 14,
                            textAlign: 'center',
                            boxShadow: 5,
                            width: 'fit-content',
                            position: 'absolute'
                        }}>
                            {renderButton(0, "Friends")}
                            /
                            {renderButton(1, "Recent Players")}
                        </Box>
                        
                        <br />
                        <Box sx={{
                            bgcolor: 'white',
                            mt: 6,
                            mb: 2,
                            ml: 23,
                            textAlign: 'center',
                            boxShadow: 5,
                            width: 'fit-content',
                            position: 'absolute',
                            fontSize: '12px',
                        }}>
                            {renderButton(2, "Sent")}
                            /
                            {renderButton(3, "Received")}
                        </Box>
                    </Grid>
                </Grid>

                {friendRender()}
                
                <BackButton />

                <Modal open={isModalOpen} onClose={handleFriendModalClose}>
                    <Box sx={{
                        width: '30%',
                        height: '27%',
                        bgcolor: '#2d7044',
                        border: 1,
                        borderColor: 'white',
                        top: '20%',
                        left: '30%',
                        position: 'absolute',
                        boxShadow: 5,
                        textAlign: 'center',
                    }}>
                        <h1>Add Friend</h1>
                        <Divider />
                        <Box component='form' noValidate onSubmit={handleSubmit}>
                            <TextField
                                size='small'
                                // value={username}
                                fullWidth
                                label='Enter Username'
                                variant="filled"
                                sx={{bgcolor: '#e3e3e3', width: '90%', mt: '5%'}}
                                onChange={handleAddFriendUsernameChange}
                            />
                            <Button
                                id="signUp"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: '50%' }}
                            >
                                Add Friend
                            </Button>
                        </Box>
                        {modal}
                    </Box>
                </Modal>
                {partyMenu}
                <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />
            </Box>
            <Sidebar />
        </div>
    );
}