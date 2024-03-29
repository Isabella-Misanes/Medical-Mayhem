import { Box, IconButton} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../auth';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

export default function Sidebar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  function handleLogout() {
    if(store.guest) store.logoutGuest();
    else auth.logoutUser();
  }

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
      <IconButton onClick={()=>{handleLogout()}} sx={{
        position: 'fixed',
        alignContent: 'center',
        bottom: '2%',
        right: '15px',
        color: 'white'
      }}>
        <LogoutIcon/>
      </IconButton>
    </Box>
  );
}