import React, { useState } from 'react';
import { AppBar, Box, Button, Menu, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Toolbar, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

export default function LeaderBoardScreen() {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clickDropdown = (sort) => {
    handleMenuClose(); // Closes dropdown menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className="App">
      <Box id="box-root"
        sx={{ 
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box 
          sx={{ 
            flexGrow: 1,
            width: '100%',
            position: 'absolute'
          }}
        >
        </Box>
        <Box
          sx={{
            paddingTop: '3%',
            margin: 'auto',
            height: '85%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            minHeight: '85%',
            maxHeight: '85%'
          }}
        >
          <TableContainer sx={{
            boxShadow: 4,
            width: 'fit-content',
          }}>
            <Table
              sx={{
                bgcolor: 'background.paper',
                position: 'relative',
                maxHeight: '100%',
              }}
            />
            <TableHead sx={{
                bgcolor: '#34732F',
                position: 'sticky',
                top: 0,
                zIndex: 1,
            }}>
              <TableRow>
                <TableCell sx={{
                    color: 'white'
                }}>Username</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Highest Score</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Total Score</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Games Played</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Minigames Played</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Favorite Minigame</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{
                bgcolor: '#E7E7E7'
            }}>

                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>189,213</TableCell>
                  <TableCell>1,988,031</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>438</TableCell>
                  <TableCell>Medicine Matching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Player1</TableCell>
                  <TableCell>999,999</TableCell>
                  <TableCell>999,999,999</TableCell>
                  <TableCell>99</TableCell>
                  <TableCell>999</TableCell>
                  <TableCell>Heart Beat</TableCell>
                </TableRow>
                

            </TableBody>
          </TableContainer>
        </Box>
      </Box>
      <Sidebar />
      <BackButton />
    </div>
  );
}