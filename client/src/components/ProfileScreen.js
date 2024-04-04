import { Box, Button, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, IconButton, LinearProgress, TextField } from '@mui/material';
import { buttonStyle } from '../App';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileScreen() {
    const navigate = useNavigate();
    const { store } = useContext(GlobalStoreContext);
    const [showProfileScreen, setShowProfileScreen] = useState(true);
    const [editEnabled, setEditEnabled] = useState(false);

    const handleToggleScreen = () => {
        setShowProfileScreen(!showProfileScreen);
    };

    function handleEditProfile(event) {
        if(editEnabled) {
            handleSubmitProfileEdits(event);
        }
        setEditEnabled(!editEnabled);
    }

    function handleSubmitProfileEdits(event) {
        store.submitProfileEdits(event);
    }

    const profileScreen = (
        <Card sx={{
            bgcolor: '#4D9147',
            top: '20%',
            left: '25%',
            position: 'absolute',
            boxShadow: 10,
            textAlign: 'center',
            borderRadius: '16px',
            color: 'white', 
        }}>
            <CardActionArea 
                onClick={handleToggleScreen}
                disabled={editEnabled}>
                <Divider />
                <Box sx={{
                    bgcolor: '#e3e3e3',
                    width: '100%',
                    height: '70%',
                    color: 'black',
                }}>
                    <Grid container spacing={4} sx={{
                        textAlign: 'left'
                    }}>
                        <Grid item xs={12} sx={{
                            bgcolor: '#4D9147',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h1>Mayhem Hospital</h1>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={4}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                border: 2,
                                borderColor: 'black',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://lh4.googleusercontent.com/-K7jvRKlNIJsgPxiouSy6jimwEU8LSStZpPurx6Z3UCIUOybtX6QQLiLMo2Nwtnn_a1gCSCjH8g28tTmHXjrTD5Hga3TNYPJT6SZoaOpoShr8zvWPeBG_V32B6irCZaz_fSNxU3xMhYipRLCpnoPIVs"
                                    title="tbh"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{
                            fontSize: '12pt'
                        }}>
                            <p>
                                CoolDoge<br/>
                                Last Seen: Now<br/>
                                Registered Since: Jan 22, 2024
                            </p>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>   
                </Box>
            </CardActionArea>
            <CardActions>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'white'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                id="filled-multiline-static"
                                label="Bio"
                                multiline
                                fullWidth
                                rows={4}
                                defaultValue="Hello everyone! Send me an invite whenever you're down to play!"
                                variant="filled"
                                disabled={!editEnabled}
                                sx={{
                                }}>
                                
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sx={{
                            bgcolor: '#4D9147',
                        }}>
                            <IconButton onClick={(event) => {handleEditProfile(event)}} 
                                sx={{
                                    color: editEnabled ? 'red' : 'white'
                            }}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </CardActions>            
        </Card>
    );

    const achievementsScreen = (
        <Card sx={{
            bgcolor: '#4D9147',
            top: '20%',
            left: '25%',
            position: 'absolute',
            boxShadow: 10,
            textAlign: 'center',
            borderRadius: '16px',
            color: 'white', 
            width: '53%'
        }}>
            <CardActionArea 
                onClick={handleToggleScreen}>
                <Divider />
                <Box sx={{
                    bgcolor: '#e3e3e3',
                    width: '100%',
                    height: '70%',
                    color: 'black',
                }}>
                    <Grid container spacing={4} sx={{
                        textAlign: 'center'
                    }}>
                        <Grid item xs={12} sx={{
                            bgcolor: '#4D9147',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h1>Mayhem Hospital</h1>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://lh4.googleusercontent.com/-K7jvRKlNIJsgPxiouSy6jimwEU8LSStZpPurx6Z3UCIUOybtX6QQLiLMo2Nwtnn_a1gCSCjH8g28tTmHXjrTD5Hga3TNYPJT6SZoaOpoShr8zvWPeBG_V32B6irCZaz_fSNxU3xMhYipRLCpnoPIVs"
                                    title="medal1"
                                />
                            </Box>
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://lh4.googleusercontent.com/-K7jvRKlNIJsgPxiouSy6jimwEU8LSStZpPurx6Z3UCIUOybtX6QQLiLMo2Nwtnn_a1gCSCjH8g28tTmHXjrTD5Hga3TNYPJT6SZoaOpoShr8zvWPeBG_V32B6irCZaz_fSNxU3xMhYipRLCpnoPIVs"
                                    title="medal2"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://lh4.googleusercontent.com/-K7jvRKlNIJsgPxiouSy6jimwEU8LSStZpPurx6Z3UCIUOybtX6QQLiLMo2Nwtnn_a1gCSCjH8g28tTmHXjrTD5Hga3TNYPJT6SZoaOpoShr8zvWPeBG_V32B6irCZaz_fSNxU3xMhYipRLCpnoPIVs"
                                    title="medal3"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://lh4.googleusercontent.com/-K7jvRKlNIJsgPxiouSy6jimwEU8LSStZpPurx6Z3UCIUOybtX6QQLiLMo2Nwtnn_a1gCSCjH8g28tTmHXjrTD5Hga3TNYPJT6SZoaOpoShr8zvWPeBG_V32B6irCZaz_fSNxU3xMhYipRLCpnoPIVs"
                                    title="medal4"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={32} />
                            </Box>
                            <p>
                                Win/Loss Ratio<br/>
                                20-9<br/>
                                Patients Saved<br/>
                                182
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={50} />
                            </Box>
                            <p>
                                Minigames Completed per Game<br/>
                                109<br/>
                                Patient Deaths<br/>
                                36
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={20} />
                            </Box>
                            <p>
                                Time Played<br/>
                                9h 50m 2s<br/>
                                Favorite Fellow Doctor<br/>
                                JareBear
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={100} />
                            </Box>
                            <p>
                                Longest Win Streak<br/>
                                3<br/>
                                Most Played Map<br/>
                                Healing Havoc
                            </p>
                        </Grid>
                    </Grid>   
                </Box>
            </CardActionArea>   
        </Card>
    );

    return (
        <div id="profile-screen">
            {showProfileScreen ? profileScreen : achievementsScreen}
            <Sidebar />
            <Button variant="contained"
                sx={[buttonStyle, {
                    left: '2%',
                    bottom: '2%',
                    position: 'absolute'
                }]}
                onClick={()=>{navigate("/")}}>
                Back
            </Button>
        </div>
    );
}