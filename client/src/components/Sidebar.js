import { Avatar, Box, IconButton, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../auth';
import { useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import ReportModal from './ReportModal';
import { api } from '../store/store-request-api';
import SocketEvents from '../constants/socketEvents';
import socket from '../constants/socket';

export default function Sidebar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [showReportModal, setShowReportModal] = useState(false);
    const [clickedUser, setClickedUser] = useState('');
    if(clickedUser); // Will implement later
    const [party, setParty] = useState([]); // an array of json objects of the form {profilePicture: ..., _id: ...}

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLeaveParty() {
        
        // Filter out the current user from the party

        console.log(store.partyInfo.users)
        let newParty = store.partyInfo.users.filter(user => user !== auth.username)
        
        // .filter returns a single element without it being in an array if it's onyl one element
        // filtered. So, I had to do this so that newParty is maintained as an array
        if (!Array.isArray(newParty))
            newParty = [newParty]

        // Update everyone with the new party without the current user
        socket.emit(SocketEvents.LEAVE_PARTY, {
            partyUsers: newParty
        })

        // User is now in a party by himself sadge
        store.updateParty([auth.username])
        console.log(store.partyInfo.users)
    }

    function handlePrivateMessaging(event) {
        // store.openPrivateMessaging(event);
        handleMenuClose();
    }

    function handleAddFriend(event) {
        // store.sendFriend(event);
        handleMenuClose();
    }

    function handlePromoteToLeader(event) {
        store.promoteToLeader(event);
        handleMenuClose();
    }

    function handleRemoveFromParty(event) {
        store.removeFromParty(event);
        handleMenuClose();
    }

    function handleReportPlayer(event) {
        setShowReportModal(true);
        handleMenuClose();
    }

    useEffect(() => {

        console.log(store.partyInfo)

        // Given the users in partyInfo.users, fetch each of their profile picture and _id and store them appropriately in
        // this component's state
        async function asyncUpdateParty() {
            const partyUsers = []
            for (let user of store.partyInfo.users) {
                try {
                    const response = await api.get(`/party/${user}`)
                    
                    if (response.status === 200) {
                        console.log('PARTY USERS DATA: ' + JSON.stringify(response.data))
                        partyUsers.push(response.data)
                    }

                } catch (err) {
                    console.log(err)
                }
            }

            setParty(partyUsers)
        }
        asyncUpdateParty()
        
    }, [store.partyInfo])

    const partyMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={(event) => {handlePrivateMessaging(event)}}>
                Private Message
            </MenuItem>
            <MenuItem onClick={(event) => {handleAddFriend(event)}}>
                Add Friend
            </MenuItem>
            <MenuItem onClick={(event) => {handlePromoteToLeader(event)}}>
                Promote to Leader
            </MenuItem>
            <MenuItem onClick={(event) => {handleRemoveFromParty(event)}}>
                Remove From Party
            </MenuItem>
            <MenuItem onClick={(event) => {handleReportPlayer(event)}}>
                Report Player
            </MenuItem>
        </Menu>
    );

    // const renderPartyMembers = () => {
    //     const partyMembers = [];
    //     if(party && party.length > 0) {
    //         console.log(party)
    //         party.forEach((user, index) => {
    //             partyMembers.push(
    //                 <PartyMember user={user} key={index} onClick={(event) => {
    //                     setClickedUser(user);
    //                     handleProfileMenuOpen(event);
    //                 }} marginTop={(index * 50) + 10 + 'px'} />
    //             )
    //         })
    //     }
    //     return partyMembers;
    // }

    console.log(party)
    return (
            <Box id='sidebar' sx={{ 
                backgroundColor: '#104c00',
                flexGrow: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                right: '0%'
            }}
            >
                {party.map((user, index) => (
                    <PartyMember user={user} key={index} onClick={(event) => {
                        setClickedUser(user);
                        handleProfileMenuOpen(event);
                    }} marginTop={(index * 50) + 10 + 'px'} />
                ))}
                
                <IconButton onClick={()=>{handleLeaveParty()}} sx={{
                    position: 'fixed',
                    bottom: '2%',
                    color: 'white'
                }}>
                    <LogoutIcon />
                </IconButton>
                {partyMenu}
                <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />
            </Box>
    );
}

function PartyMember(props) {
    const {user} = props;
    if(user) {
        return (
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    marginTop: props.marginTop,
                    color: 'white'
                }}
            >
                <Avatar src={user.profilePicture} />
            </IconButton>
        );
    }
}