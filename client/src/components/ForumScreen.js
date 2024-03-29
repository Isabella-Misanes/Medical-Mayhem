import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function ForumScreen({setCurrScreen}) {
    const navigate = useNavigate();
    return (
        <div id="forum-screen">
            <Sidebar/>
            <Box
                sx={{
                    height: '90%',
                    width: '60%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '20%',
                    top: '5%',
                    textAlign: 'center'
                }}>
                <Typography variant="h4" gutterBottom>Forums</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={5}>
                        <Button variant="contained"
                            sx={[buttonStyle, {
                                left: '2%'
                            }]}
                            onClick={()=>{navigate("/newthread")}}>
                            Start New Thread
                        </Button>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <TextField label="Search" size="small"></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained"
                sx={[buttonStyle, {
                    left: '2%',
                    bottom: '2%',
                    position: 'absolute'
                }]}
                onClick={()=>{navigate("/home")}}>
                Back
            </Button>
        </div>
    );
}