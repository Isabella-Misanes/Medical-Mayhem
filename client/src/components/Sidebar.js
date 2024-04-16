import { Box, IconButton, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext, { UserRoleType } from '../auth';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import ReportModal from './ReportModal';

export default function Sidebar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [showReportModal, setShowReportModal] = useState(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        if(auth.role === UserRoleType.GUEST) auth.logoutGuest();
        else {
            store.reset()
            auth.logoutUser();
        }
    }

    function handlePrivateMessaging(event) {
        store.openPrivateMessaging(event);
        handleMenuClose();
    }

    function handleAddFriend(event) {
        store.addFriend(event);
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

    return (
        auth.role === UserRoleType.USER && 
            <Box sx={{ 
                backgroundColor: '#104c00',
                position: 'fixed',
                flexGrow: 1,
                height: '100%',
                width: '70px',
                display: 'flex',
                flexDirection: 'column',
                right: '0%'
            }}>
                <PartyMember handleProfileMenuOpen={handleProfileMenuOpen} marginTop={'10px'} />
                <PartyMember handleProfileMenuOpen={handleProfileMenuOpen} marginTop={'60px'} />
                <PartyMember handleProfileMenuOpen={handleProfileMenuOpen} marginTop={'110px'} />
                <PartyMember handleProfileMenuOpen={handleProfileMenuOpen} marginTop={'160px'} />
                
                <IconButton onClick={()=>{handleLogout()}} sx={{
                    position: 'fixed',
                    alignContent: 'center',
                    bottom: '2%',
                    right: '15px',
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
    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={props.handleProfileMenuOpen}
            sx={{
                position: 'absolute',
                right: '22.5px',
                marginTop: props.marginTop,
                color: 'white'
            }}
        >
            <AccountCircleIcon/>
        </IconButton>
    );
}