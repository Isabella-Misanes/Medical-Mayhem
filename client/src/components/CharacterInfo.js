import { Button, Grid, TextField } from '@mui/material';
import { buttonStyle } from '../Styles';

export default function CharacterInfo(props) {
    const avatar = props.avatar;
    const avatarPic = avatar.avatarSprite !== '' ? convertDataUrl(avatar.avatarSprite) : '';

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