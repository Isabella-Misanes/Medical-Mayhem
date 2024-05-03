import { Button, Divider, Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';

import BackButton from './BackButton';
import { React, useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import { charList, characterCard, outerContentBox, innerContentBox, sortButton } from '../Styles';
import CharacterInfo from './CharacterInfo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MapSearchScreen() {
    const {store} = useContext(GlobalStoreContext);
    const [showCharacterList, setCharacterList] = useState(true);
    const [avatarList, setAvatarList] = useState([]);
    const [currAvatar, setCurrAvatar] = useState(null);

    useEffect(() => {
        if (store.avatarList && store.avatarList.avatars && store.avatarList.avatars.length > 0) {
            setAvatarList(store.avatarList.avatars);
        } else {
            store.getAllAvatars();
            setAvatarList([]);
        }
        // eslint-disable-next-line
    }, [store.avatarList])

    useEffect(() => {
        if(showCharacterList) {
            store.getAllAvatars();
        }
        // eslint-disable-next-line
    }, [showCharacterList])

    function handleOpenMap(event) {
        store.openMap(event);
    }

    function handleCharacterClick(avatar) {
        setCurrAvatar(avatar);
        setCharacterList(false);
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
                <Grid item xs={2} sx={{ fontSize: '10px', ml: -2}}>
                    Author
                </Grid>
                <Grid item xs={1} sx={{ fontSize: '10px', ml: 1}}>
                    Comments
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                
                <List sx={charList}>
                    {avatarList.length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        avatarList.map((avatar, index) => (
                            <div key={index} id={"character-card-" + index}>
                                <ListItem key={index} sx={characterCard}>
                                    <ListItemButton key={index} onClick={() => {handleCharacterClick(avatar)}}>
                                        <Grid item xs={9} sx={{ textAlign: 'left' }}>
                                            {avatar.avatarName}
                                        </Grid>
                                        <Grid item xs={2} sx={{ fontSize: '10px' }}>
                                            {avatar.author}
                                        </Grid>
                                        <Grid item xs={1}>{avatar.comments.length}</Grid>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </div>
                        ))
                    )}
                </List>
            </Grid>
            <Grid item xs={12}/>
        </Grid>
    );

    const characterDetails = (
        <Grid container sx={innerContentBox}>
            <Button sx={{color: '#3A9158'}} onClick={() => {setCharacterList(true)}}>
                <ArrowBackIcon/>
                Character search
            </Button>
            <CharacterInfo 
                avatar={currAvatar}
            />
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

            
            <BackButton />
        </div>
    );
}