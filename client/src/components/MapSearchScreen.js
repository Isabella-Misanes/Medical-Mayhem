import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

export default function MapSearchScreen() {
    const {store} = useContext(GlobalStoreContext);

    function handleOpenMap(event) {
        store.openMap(event);
    }

    return (
        <div id="map-search-screen">
            <Box sx={{
                height: '90%',
                width: '45%',
                flexDirection: 'column',
                backgroundColor: '#fffbc3',
                position: 'absolute',
                left: '27.5%',
                top: '3%',
                textAlign: 'center',
                p: 2,
                boxShadow: 10
            }}/>
            <Box
                sx={{
                    height: '85%',
                    width: '40%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '30%',
                    top: '5%',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: 10
                }}>
                <h3>Character Search</h3>
                <Grid container spacing={2}>
                    <Grid item xs={8}/>
                    <Grid item xs={4}>
                        <TextField label="Search" size="small" />
                        <Button variant='outlined' sx={{
                            mt: 1,
                            mb: 1,
                            fontSize: '10px',
                            borderColor: 'black',
                            borderRadius: 0,
                            color: 'black'
                        }}>
                            Newest
                        </Button>
                        <Button variant='outlined' sx={{
                            mt: 1,
                            mb: 1,
                            fontSize: '10px',
                            borderColor: 'black',
                            borderRadius: 0,
                            color: 'black'
                        }}>
                            Top
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{
                    fontSize: '14px',
                    alignItems: 'center'
                }}>
                    <Grid item xs={8} sx={{
                        textAlign: 'left',
                        ml: 3
                    }}>
                        Search Results
                    </Grid>
                    <Grid item xs={1} sx={{ fontSize: '10px', ml: -2}}>
                        Author
                    </Grid>
                    <Grid item xs={1} sx={{ fontSize: '10px'}}>
                        Downloads
                    </Grid>
                    <Grid item xs={1} sx={{ fontSize: '10px', ml: 1}}>
                        Comments
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    
                    <List sx={{ 
                        width: '100%', 
                        ml: 2
                    }}>
                        <ListItem sx={{bgcolor: 'white', mt: 2, mb: 2}}>
                            <ListItemButton onClick={(event) => {handleOpenMap(event)}}>
                                <Grid item xs={9} sx={{
                                    textAlign: 'left',
                                }}>
                                    Example Map
                                </Grid>
                                <Grid item xs={1} sx={{
                                    fontSize: '10px'
                                }}>
                                    User1
                                </Grid>
                                <Grid item xs={1}>
                                    2
                                </Grid>
                                <Grid item xs={1}>
                                    188
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{bgcolor: 'white', mt: 2, mb: 2}}>
                            <ListItemButton onClick={(event) => {handleOpenMap(event)}}>
                                <Grid item xs={9} sx={{
                                    textAlign: 'left',
                                }}>
                                    New Map
                                </Grid>
                                <Grid item xs={1} sx={{
                                    fontSize: '10px'
                                }}>
                                    User2
                                </Grid>
                                <Grid item xs={1}>
                                    20
                                </Grid>
                                <Grid item xs={1}>
                                    1
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </List>
                </Grid>
            </Box>
            <Sidebar/>
            <BackButton />
        </div>
    );
}