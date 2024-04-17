import { Box, Avatar, Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
// import { useContext, useEffect, useState } from 'react';
// import GlobalStoreContext from '../store';

export default function SocialCard(props) {
    const friendName = props.friendName;
    const friendOnlineStatus = props.friendOnlineStatus;
    const friendPfp = props.friendPfp !== '' ? convertDataUrl(props.friendPfp) : '';

    // Converts profile picture from Base 64 data to readable URL string
    // shoutout to chatgpt for this 🙏
    function convertDataUrl(dataUrl) {
        var arr = dataUrl.split(','),
        bstr = atob(arr[arr.length - 1]),
        mime = arr[0].match(/:(.*?);/)[1];
        return 'data:' + mime + ';base64,' + btoa(bstr);
    }
    
    return (
        <Box onClick={props.onClick} sx={{
            width: '15%',
            height: '30%',
            bgcolor: 'yellow',
            position: 'absolute',
            top: props.top,
            left: props.left,
            boxShadow: 5,
            cursor: 'pointer'
        }}>
            <Avatar
                src={friendPfp}
                sx={{width: 150, height: 150, margin: 'auto', marginTop: '5px' }}
            />
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <CircleIcon sx={{color: friendOnlineStatus ? 'lime' : 'lightgray', marginLeft:'10px'}} />
                </Grid>
                <Grid item>
                    <h2 style={{marginLeft: '10px'}}>{friendName}</h2>
                </Grid>
            </Grid>
        </Box>
    );
}