import { Box, IconButton, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

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
        <MenuItem onClick={handleMenuClose}>Private Message</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add Friend</MenuItem>
        <MenuItem onClick={handleMenuClose}>Promote to Leader</MenuItem>
        <MenuItem onClick={handleMenuClose}>Remove From Party</MenuItem>
        <MenuItem onClick={handleMenuClose}>Report Player</MenuItem>
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