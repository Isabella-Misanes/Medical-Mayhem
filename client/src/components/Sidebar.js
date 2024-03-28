import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar() {
  return (
    <Box sx={{ 
        backgroundColor: '#104c00',
        position: 'absolute',
        flexGrow: 1,
        height: '100%',
        width: '70px',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: '0%',
    }}>
    </Box>
  );
}