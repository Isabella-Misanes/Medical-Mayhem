import { Button, Divider, Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { React, useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import { outerContentBox, innerContentBox, sortButton } from '../Styles';

export default function MapSearchScreen() {
    const {store} = useContext(GlobalStoreContext);
    const [showCharacterList, setCharacterList] = useState(true);
    const avatarList = [{avatarName: "Untitled", author: "User1", speed: 1, strength: 2}];

    useEffect(() => {
        store.getAllAvatars();
        console.log(avatarList);
        // eslint-disable-next-line
    }, [])

    function handleOpenMap(event) {
        store.openMap(event);
    }

    const characterList = (
        <Grid container sx={innerContentBox}>
            <Grid item xs={12}>
                <h3>Character Search</h3>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={6}>
                <TextField fullWidth label="Search" size="small" />
            </Grid>
            <Grid item xs={4}>
                <Button variant='outlined' sx={sortButton}
                    onClick={(event) => {handleOpenMap(event)}}>
                    Newest
                </Button>
                <Button variant='outlined' sx={sortButton}
                    onClick={(event) => {handleOpenMap(event)}}>
                    Top
                </Button>
            </Grid>
            <Grid item xs={1}/>
            <Grid container spacing={1} sx={{
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
                    {avatarList.map((avatar, index) => (
                        <>
                            <ListItem key={index} sx={{ bgcolor: 'white', mt: 2, mb: 2 }}>
                                <ListItemButton onClick={() => { setCharacterList(false) }}>
                                    <Grid item xs={9} sx={{ textAlign: 'left' }}>
                                        {avatar.avatarName}
                                    </Grid>
                                    <Grid item xs={1} sx={{ fontSize: '10px' }}>
                                        {avatar.author}
                                    </Grid>
                                    <Grid item xs={1}>
                                        {avatar.speed}
                                    </Grid>
                                    <Grid item xs={1}>
                                        {avatar.strength}
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={12}/>
            <Grid item xs={12}/>
            <Grid item xs={12}/>
        </Grid>
    );

    const characterDetails = (
        <Grid container sx={innerContentBox}>
            <Grid item xs={12}>
                <h3>Sprite by ____</h3>
            </Grid>
            
            <Button onClick={() => {setCharacterList(true)}}>
                Character search
            </Button>
        </Grid>
    );

    return (
        <div id="map-search-screen">
            <Grid container>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <Grid container sx={outerContentBox}>
                        <Grid item xs={10}>
                            {showCharacterList ? characterList : characterDetails}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}/>
            </Grid>

            <Sidebar/>
            <BackButton />
        </div>
    );
}