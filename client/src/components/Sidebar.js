import Box from '@mui/material/Box';

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
        right: '0%',
    }}>
    </Box>
  );
}