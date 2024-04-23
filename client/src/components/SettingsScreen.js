import { Box, Button, Divider, Grid, LinearProgress, Typography, ToggleButton, Slider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox'
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { buttonStyle } from '../App';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext, { UserRoleType } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function SettingsScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [masterValue, setMasterValue] = useState(100);
    const [musicValue, setMusicValue] = useState(100);
    const [sfxValue, setSfxValue] = useState(100);

    const resetButton = {
        mt: 1,
        mb: 2,
        bgcolor: 'red',
        color: 'white',
        ":hover": {
          bgcolor: '#c20900'},
    }

    const confirmButton = {
        mt: 1,
        mb: 2,
        bgcolor: 'green',
        color: 'white',
        ":hover": {
          bgcolor: '#2d7044'},
    }

    function handleLogout() {
        store.reset()
        auth.logoutUser();
    }

    function handleDeleteAcc() {
        store.reset()
        auth.deleteUser()
        auth.logoutUser();
    }

    function handleLogin() {
        navigate('/login')
    }

    function handleRegister() {
        navigate('/register')
    }

    function handleResetAudio() {
        console.log("Reset Audio in Settings.");
        setMasterValue(100);
        setMusicValue(100);
        setSfxValue(100);
    }
    function handleConfirmAudio(event) {
        console.log("Confirm Audio in Settings.");
    }

    function handleResetControls() {
        console.log("Reset controls in Settings.");
    }
    function handleConfirmControls(event) {
        console.log("Confirm Controls in Settings");
    }

    const handleMasterSliderChange = (event, newValue) => {
        setMasterValue(newValue);
    }

    const handleMusicSliderChange = (event, newValue) => {
        setMusicValue(newValue);
    }
    
    const handleSfxSliderChange = (event, newValue) => {
        setSfxValue(newValue);
    }

    return (
        <div id="settings-screen">
            <Box sx={{
                height: '90%',
                width: '45%',
                flexDirection: 'column',
                backgroundColor: '#fffbc3',
                position: 'absolute',
                left: '27.5%',
                top: '3%',
                textAlign: 'center',
                p: 2,
                boxShadow: 10
            }}/>
            <Box
                sx={{
                    height: '85%',
                    width: '40%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '30%',
                    top: '5%',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: 10
                }}>
                <Typography variant="h4" gutterBottom><strong>Settings</strong></Typography>
                <Divider />
                <h4>Audio</h4>
                <Grid container spacing={1} sx={{
                    width: '80%',
                    ml: '10%',
                    alignItems: 'center'
                }}>
                    <Grid item xs={3}>
                        Master
                    </Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof masterValue === 'number' ? masterValue : 0}
                            onChange={handleMasterSliderChange}
                            aria-labelledby="master-slider"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {masterValue}
                    </Grid>

                    <Grid item xs={3}>
                        Music
                    </Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof musicValue === 'number' ? musicValue : 0}
                            onChange={handleMusicSliderChange}
                            aria-labelledby="music-slider"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {musicValue}
                    </Grid>

                    <Grid item xs={3}>
                        SFX
                    </Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof sfxValue === 'number' ? sfxValue : 0}
                            onChange={handleSfxSliderChange}
                            aria-labelledby="sfx-slider"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {sfxValue}
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {handleResetAudio()}} sx={resetButton}>
                            Reset
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {handleConfirmAudio()}} sx={confirmButton}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                
                <h4>Controls</h4>
                    <Grid container spacing={1} sx={{
                        width: '80%',
                        ml: '10%',
                        alignItems: 'center'
                    }}>
                    <Grid item xs={6}>
                        Move Up
                    </Grid>
                    <Grid item xs={6}>
                        W
                    </Grid>
                    <Grid item xs={6}>
                        Move Down
                    </Grid>
                    <Grid item xs={6}>
                        S
                    </Grid>
                    <Grid item xs={6}>
                        Move Left
                    </Grid>

                    <Grid item xs={6}>
                        A
                    </Grid>
                    <Grid item xs={6}>
                        Move Right
                    </Grid>
                    <Grid item xs={6}>
                        D
                    </Grid>
                    <Grid item xs={6}>
                        Interact
                    </Grid>
                    <Grid item xs={6}>
                        E
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {handleResetControls()}} sx={resetButton}>
                            Reset
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {handleConfirmControls()}} sx={confirmButton}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
                <Divider />

                { auth.role === UserRoleType.USER && 
                <>
                    <Box display="flex" justifyContent={'space-evenly'} spacing={1} paddingTop={2}>
                        <ToggleButton size='small'>
                            Private Profile
                            <Checkbox />
                        </ToggleButton>

                        <ToggleButton size='small'>
                            Messages
                            <Checkbox />
                        </ToggleButton>

                        <ToggleButton size='small'>
                            Party
                            <Checkbox />
                        </ToggleButton>
                    </Box>
                </>}
               
                <Box display="flex" justifyContent={'center'} gap={5}>
                    { auth.role === UserRoleType.USER ?
                        <>
                            <Button id='log-out' onClick={() => {handleLogout()}} sx={[confirmButton, {color: 'white', mt: 2}]}>
                                Log Out
                            </Button>
                            <Button id='delete-account' onClick={() => {handleDeleteAcc()}} sx={[resetButton, {color: 'white', mt: 2}]}>
                                Delete Account
                            </Button> 
                        </> :
                        <>
                            <Button id='login' onClick={() => navigate('/login')} sx={[buttonStyle, {color: 'white', mt: 2}]}>
                                Log In
                            </Button>
                            <Button id='register' onClick={() => {handleRegister()}} sx={[buttonStyle, {color: 'white', mt: 2}]}>
                                Register
                            </Button> 
                        </>}
                    
                </Box>
            </Box>
            <Sidebar/>
            <BackButton />
        </div>
    );
}