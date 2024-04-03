import { Box, IconButton, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';

export default function Sidebar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  function handleLogout() {
    if(store.guest) store.logoutGuest();
    else auth.logoutUser();
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
    store.reportPlayer(event);
    handleMenuClose();
  }

  const partyMenu = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem 
          onClick={(event) => {
            handlePrivateMessaging(event)
          }}>
          Private Message
        </MenuItem>
        <MenuItem 
          onClick={(event) => {
            handleAddFriend(event)
          }}>
          Add Friend
        </MenuItem>
        <MenuItem onClick={(event) => {
          handlePromoteToLeader(event)
        }}>
          Promote to Leader
        </MenuItem>
        <MenuItem onClick={(event) => {
          handleRemoveFromParty(event)
        }}>Remove From Party</MenuItem>
        <MenuItem onClick={(event) => {
          handleReportPlayer(event)
        }}>Report Player</MenuItem>
    </Menu>
);

  return (
    <Box sx={{ 
        backgroundColor: '#104c00',
        position: 'fixed',
        flexGrow: 1,
        height: '100%',
        width: '70px',
        display: 'flex',
        flexDirection: 'column',
        right: '0%',
    }}>
      <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          sx={{
            position: 'absolute',
            right: '22.5px',
            marginTop: '10px',
            color: 'white'
          }}
      >
          <AccountCircleIcon/>
      </IconButton>
      
      <IconButton onClick={()=>{handleLogout()}} sx={{
        position: 'fixed',
        alignContent: 'center',
        bottom: '2%',
        right: '15px',
        color: 'white'
      }}>
        <LogoutIcon/>
      </IconButton>
      {partyMenu}
    </Box>
  );
}