import { Box, Button, Divider, Grid, LinearProgress, Typography, ToggleButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox'
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { buttonStyle } from '../App';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import AuthContext, { UserRoleType } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function SettingsScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()

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
                        <LinearProgress variant="determinate" value={56} />
                    </Grid>
                    <Grid item xs={2}>
                        56
                    </Grid>

                    <Grid item xs={3}>
                        Music
                    </Grid>
                    <Grid item xs={7}>
                        <LinearProgress variant="determinate" value={15} />
                    </Grid>
                    <Grid item xs={2}>
                        15
                    </Grid>

                    <Grid item xs={3}>
                        SFX
                    </Grid>
                    <Grid item xs={7}>
                        <LinearProgress variant="determinate" value={90} />
                    </Grid>
                    <Grid item xs={2}>
                        90
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
                            <Button onClick={() => {handleLogin()}} sx={[buttonStyle, {color: 'white', mt: 2}]}>
                                Log In
                            </Button>
                            <Button onClick={() => {handleRegister()}} sx={[buttonStyle, {color: 'white', mt: 2}]}>
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