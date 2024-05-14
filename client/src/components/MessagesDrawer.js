import { Box, Button, Divider, Drawer, Grid, List, ListItem, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useContext, useState, useEffect, useRef } from 'react';
import GlobalStoreContext from '../store';
import { buttonStyle } from '../Styles';
import SendIcon from '@mui/icons-material/Send';
import AuthContext, { UserRoleType } from '../auth';
import socket from '../constants/socket';
import SocketEvents from '../constants/socketEvents';

export default function MessagesDrawer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [value, setValue] = useState('1');
    const [state, setState] = useState('bottom');
    const [messageText, setMessageText] = useState('');
    const [chat, setChat] = useState({public: [], party: [], private: []});
    const publicChatRef = useRef(null);
    const partyChatRef = useRef(null);
    const privateChatRef = useRef(null);

    const tabButton = {
        color: 'white',
        '&.Mui-selected': {
            color: 'white'
        },
    }

    const handleMessageTextChange = (event) => {
        setMessageText(event.target.value)
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleSendMessage() {
        if(messageText === '') return;
        switch(value) {
            case '1':
                // store.sendPublicMessage(messageText);
                socket.emit(SocketEvents.SEND_PUBLIC_MESSAGE, {username: auth.username, text: messageText});
                break;
            case '2':
                socket.emit(SocketEvents.SEND_PARTY_MESSAGE, {username: auth.username, text: messageText});
                break;
            case '3':
                store.sendPrivateMessage();
                break;
            default:
                break;
        }
        setMessageText('');
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setState({ ...state, 'bottom' : open });
    };

    const chatRender = (messageArr) => {
        const messageItems = [];
        for(let i = 0; i < messageArr.length; i++) {
            const chatMessage = messageArr[i];
            messageItems.push(<Message key={i} username={chatMessage.username} messageText={chatMessage.text} auth={auth} />)
        }
        return messageItems;
    }

    useEffect(() => {if(publicChatRef.current) publicChatRef.current.scrollTop = publicChatRef.current.scrollHeight}, [chat.public]);
    useEffect(() => {if(partyChatRef.current) partyChatRef.current.scrollTop = partyChatRef.current.scrollHeight}, [chat.party]);

    useEffect(() => {
        const handlePublicMessage = data => setChat(prevChat => ({...prevChat, public: [...prevChat.public, {username: data.username, text: data.text}]}));
        const handlePartyMessage = data => setChat(prevChat => ({...prevChat, party: [...prevChat.party, {username: data.username, text: data.text}]}));
        socket.on(SocketEvents.RECEIVE_PUBLIC_MESSAGE, handlePublicMessage);
        socket.on(SocketEvents.RECEIVE_PARTY_MESSAGE, handlePartyMessage);
        return () => {
            socket.off(SocketEvents.RECEIVE_PUBLIC_MESSAGE, handlePublicMessage);
            socket.off(SocketEvents.RECEIVE_PARTY_MESSAGE, handlePartyMessage);
        }
        // eslint-disable-next-line
    }, [])

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
                onClose={toggleDrawer(false)} 
                sx={{
                    width: '40%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {width: '40%'}
                }}>
                <Box sx={{bgcolor: '#34732F'}}>
                    <Box sx={{typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                    <Tab label="Public" value="1" sx={tabButton}/>
                                    {auth.role !== UserRoleType.GUEST && <Tab label="Party" value="2" sx={tabButton}/>}
                                    {auth.role !== UserRoleType.GUEST && <Tab label="Private" value="3" sx={tabButton}/>}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Box sx={{bgcolor: '#E7E7E7'}}>
                                    <List ref={publicChatRef} sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        {chatRender(chat.public)}
                                    </List>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box sx={{bgcolor: '#E7E7E7'}}>
                                    <List ref={partyChatRef} sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        {chatRender(chat.party)}
                                    </List>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box ref={privateChatRef} sx={{bgcolor: '#E7E7E7'}}>
                                    <List sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        {chatRender(chat.private)}
                                    </List>
                                </Box>
                            </TabPanel>
                            <Grid container spacing={1} sx={{
                                bgcolor: '#E7E7E7',
                                pl: 2,
                                pr: 2,
                                pb: 2
                            }}>
                                <Grid item xs={10}>
                                    <TextField
                                        onKeyDown={ev => {
                                            if(ev.key === 'Enter') handleSendMessage();
                                        }}
                                        value={messageText} fullWidth variant="standard" label="Send message..."
                                        onChange={(event) => handleMessageTextChange(event)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button type='button' id='send-message' onClick={() => {
                                        handleSendMessage();
                                        setMessageText('');
                                    }} disabled={messageText===''} sx={{
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

function Message(props) {
    const {username, messageText, auth} = props;
    return (
        <ListItem><strong>{username}{auth.username === username && ' (You)'}</strong>: {messageText}</ListItem>
    )
}