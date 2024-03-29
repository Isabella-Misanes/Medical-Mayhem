import { Box, IconButton} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import { useContext } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleLogout() {
    auth.logoutUser();
    //navigate("/");
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