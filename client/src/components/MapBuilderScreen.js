import { Grid, Paper } from '@mui/material';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import player1 from '../assets/Player-1.png.png'
import player2 from '../assets/Player-2.png.png'
import player3 from '../assets/Player-3.png.png'
import player4 from '../assets/Player-4.png.png'
import player5 from '../assets/Player-5.png.png'
import player6 from '../assets/Player-6.png.png'

export default function MapBuilderScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [selectedCharacter, setCharacter] = useState(null);

    const players = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6
    ];

    function handleCharacterClick(image, index) {
        setCharacter(index);
    }
    return (
        <div id="map-builder-screen">
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <h1>Build your character!</h1>
                </Grid>
                <Grid item xs={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        {players.map((image, index) => (
                        <Grid key={index} item xs={4}>
                            <Paper elevation={3} sx={{ 
                                height: '100%',
                                width: '100%',
                                m: 2,
                                textAlign: 'center', 
                                backgroundColor: selectedCharacter === index ? 'lightblue' : '#f0f0f0' 
                                }}
                                onClick={() => handleCharacterClick(image, index)}
                            >
                                <img
                                src={image}
                                alt={`${index+1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                />
                            </Paper>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
            <BackButton/>
        </div>
    );
}