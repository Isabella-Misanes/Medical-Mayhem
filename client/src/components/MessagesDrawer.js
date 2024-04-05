import * as React from 'react';
import { Box, Button, Divider, Drawer, Grid, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import { buttonStyle } from '../App';
import SendIcon from '@mui/icons-material/Send';

export default function MessagesDrawer() {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('1');
    const [state, setState] = useState('bottom');

    const tabButton = {
        color: '#3A9158',
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleSendMessage(event) {
        switch(value) {
            case 1:
                store.sendPublicMessage(event);
                break;
            case 2:
                store.sendPartyMessage(event);
                break;
            case 3:
                store.sendPrivateMessage(event);
                break;
            default:
                break;
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, 'bottom' : open });
    };

    return (
        <div>
            <Box id="messages-box">
                <Button sx={[buttonStyle, {
                    color: 'white', 
                    borderRadius: '0px', 
                    bottom: '0%', 
                    position: 'absolute',
                    boxShadow: 4,
                    width: '40%'
                }]} 
                    onClick={toggleDrawer(true)}>Messages</Button>
            </Box>
            <Drawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer(false)}>
                <Box sx={{ 
                    bgcolor: '#E7E7E7' 
                }}>
                    <Box sx={{ 
                        width: '50%', 
                        typography: 'body1',
                        pl: 2,
                        pb: 2,
                    }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Public" value="1" sx={tabButton}/>
                                    <Tab label="Party" value="2" sx={tabButton}/>
                                    <Tab label="Private" value="3" sx={tabButton}/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">Public Messages</TabPanel>
                            <TabPanel value="2">Party Messages</TabPanel>
                            <TabPanel value="3">Private Messages</TabPanel>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <TextField fullWidth variant="standard" label="Send Message"/>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={(event) => {handleSendMessage(event)}}
                                        sx={{
                                            color: '#2d7044',
                                            top: '20%'
                                        }}>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabContext>
                    </Box>
                    <Divider />
                </Box>
            </Drawer>
        </div>
    );
}