import { Button, Divider, Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';
import { buttonStyle, commList, commentCard } from '../Styles';
import { useState, useContext, useEffect } from 'react';
import GlobalStoreContext from '../store';

export default function CharacterInfo(props) {
    const {store} = useContext(GlobalStoreContext);
    const [commentsList, setCommentsList] = useState([]);
    const avatar = props.avatar;
    const avatarPic = avatar.avatarSprite !== '' ? convertDataUrl(avatar.avatarSprite) : '';

    useEffect(() => {
        if (store.commentsList && store.commentsList.comments && store.commentsList.comments.length > 0) {
            setCommentsList(store.commentsList.comments);
        } else {
            store.getAllAvatars();
            setCommentsList([]);
        }
        // eslint-disable-next-line
    }, [store.commentsList])

    function convertDataUrl(dataUrl) {
        var arr = dataUrl.split(','),
        bstr = atob(arr[arr.length - 1]),
        mime = arr[0].match(/:(.*?);/)[1];
        return 'data:' + mime + ';base64,' + btoa(bstr);
    }
    
    return (
        <div id="character-card">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h3>{avatar.avatarName}</h3>
                </Grid>
                <Grid item container spacing={1} xs={12}>
                    <Grid item xs={4}>
                        <img 
                            src={avatarPic}
                            width={150}
                            height={150}
                            alt=''
                        />
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'left' }}>
                            Created by: <strong>{avatar.author}</strong><br/>
                            Speed: <strong>{avatar.speed}</strong><br/>
                            Strength: <strong>{avatar.strength}</strong><br/>
                            Defense: <strong>{avatar.defense}</strong><br/>
                            Favorite Minigame: <strong>{avatar.favoredMinigame}</strong>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h4>Comments</h4>
                </Grid>

                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <List sx={commList}>
                        {commentsList.length === 0 ? (
                            <div>No comments.</div>
                        ) : (
                            commentsList.map((comment, index) => (
                                <div id={"comment-card-" + index}>
                                    <ListItem key={index} sx={commentCard}>
                                        <ListItemButton onClick={() => {console.log("Clicked")}}>
                                            <Grid item xs={9} sx={{ textAlign: 'left' }}>
                                                {comment.text}
                                            </Grid>
                                            <Grid item xs={2} sx={{ fontSize: '10px' }}>
                                                {comment.author}
                                            </Grid>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))
                        )}
                    </List>
                    Comments Here
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <TextField fullWidth label='Comment' />
                </Grid>
                <Grid item xs={12}>
                    <Button sx={buttonStyle}>
                        Comment
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}