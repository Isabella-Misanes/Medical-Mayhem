import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import Sidebar from './Sidebar';
import GlobalStoreContext from '../store';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import BackButton from './BackButton';

export default function SocialScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(0);

    function handleButtonClick(buttonId) {
        setActiveButton(buttonId);
    };

    useEffect(() => {
        switch(activeButton) {
            case 0:
                store.showFriends();
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
                store.showFriends();
                break;
        }
      }, [activeButton, store]);

    function handleFriendModalOpen() {
        setModalOpen(true);
    };

    function handleFriendModalClose() {
        setModalOpen(false);
    };

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
            }}></Box>
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
                    <Grid item xs={2} sx={{
                        mt: 2
                    }}>
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
                            <Button 
                                onClick={() => {handleButtonClick(0)}}
                                sx={{
                                    color: activeButton === 0 ? 'red' : 'black'
                            }}>
                                Friends
                            </Button>
                            /
                            <Button 
                                onClick={() => {handleButtonClick(1)}}
                                sx={{
                                    color: activeButton === 1 ? 'red' : 'black'
                            }}>
                                Recent Players
                            </Button>
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
                            <Button 
                                onClick={() => {handleButtonClick(2)}}
                                sx={{ color: activeButton === 2 ? 'red' : 'black' }}
                            >
                                Sent
                            </Button>
                            /
                            <Button 
                                onClick={() => {handleButtonClick(3)}}
                                sx={{ color: activeButton === 3 ? 'red' : 'black' }}
                            >
                                Received
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{
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
                
                <BackButton />

                <Modal
                    open={isModalOpen}
                    onClose={handleFriendModalClose}
                >
                    <Box sx={{
                        width: '30%',
                        height: '60%',
                        bgcolor: '#2d7044',
                        border: 1,
                        borderColor: 'white',
                        top: '20%',
                        left: '30%',
                        position: 'absolute',
                        boxShadow: 5,
                        textAlign: 'center',
                    }}>
                        <h1>Friend List</h1>
                        <Divider />
                        <Box sx={{
                            bgcolor: '#e3e3e3',
                            width: '90%',
                            height: '70%',
                            ml: '5%',
                            mt: '5%',
                        }}>
                            Put friend cards here
                        </Box>
                    </Box>
                </Modal>
            </Box>

            <Sidebar />
        </div>
    );
}