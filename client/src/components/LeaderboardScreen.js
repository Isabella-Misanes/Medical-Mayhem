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
            pl: '7.5%',
            height: '85%',
            width: '85%',
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
                }}>Wins</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Games Played</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Win Percentage</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Average Number of Words to Guess Correctly</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Current Win Streak</TableCell>
                <TableCell sx={{
                    color: 'white'
                }}>Longest Win Streak</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{
                bgcolor: '#E7E7E7'
            }}>

                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>McKillaGorilla</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>89%</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>24</TableCell>
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