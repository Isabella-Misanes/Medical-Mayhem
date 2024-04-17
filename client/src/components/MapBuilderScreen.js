import { Grid, Paper, Slider } from '@mui/material';
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
    const [selectedCharacter, setCharacter] = useState(0);
    const [postSprite, setSprite] = useState("");
    const [speed, setSpeed] = useState(0);
    const [strength, setStrength] = useState(0);
    const [defense, setDefense] = useState(0);
    const [favoredMinigame, setMinigame] = useState("");

    const totalPoints = 3;

    const players = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6
    ];

    function valuetext(value) {
        return `${value}°C`;
    }

    function handleCharacterClick(image, index) {
        setCharacter(index);
    }

    function handleUpdateCharacter() {
        if(postSprite !== "") {
            store.updateAvatar(postSprite, speed, strength, defense, favoredMinigame);
        }
        else {
            store.updateAvatar(player1, speed, strength, defense, favoredMinigame);
        }
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
                    <Grid container spacing={3}>
                        {players.map((image, index) => (
                        <Grid key={index} item xs={4}>
                            <Paper elevation={3} sx={{ 
                                height: '100%',
                                width: '100%',
                                m: 2,
                                textAlign: 'center', 
                                backgroundColor: selectedCharacter === index ? 'lightblue' : '#f0f0f0',
                                border: selectedCharacter === index ? 1 : 0,
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
                <Grid item xs={1}/>
                
                <Grid item xs={6}>
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',
                    }}>
                        <Grid item xs={12}>
                            <h3>Character Stats</h3>
                        </Grid>

                        <Grid item xs={2}>
                            Speed
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setSpeed(event.target.value)}}
                                sx={{
                                    width: '80%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>


                        <Grid item xs={2}>
                            Strength
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setStrength(event.target.value)}}
                                sx={{
                                    width: '80%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>


                        <Grid item xs={2}>
                            Defense
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setDefense(event.target.value)}}
                                sx={{
                                    width: '80%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>


                    </Grid>
                </Grid>
                
            </Grid>
            <BackButton/>
        </div>
    );
}