import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
// import { Engine } from "excalibur";
import React, { useState } from "react";
import { initBreakout } from "../game/breakout";
import { initMedicationMatching } from '../game/medicationmatching';

export default function GameScreen() {
    const [selectedGame, setSelectedGame] = useState(0);
    const gameCanvas = React.useRef(null);
	const gameRef = React.useRef();

	React.useEffect(() => {
		if (!gameRef.current && gameCanvas.current) {
            switch(selectedGame) {
                case 1:
                    initBreakout(gameRef, gameCanvas);
                    break;
                case 2:
                    initMedicationMatching(gameRef, gameCanvas);
                    break;
                default:
                    return;
            }
		}
	}, [selectedGame]);

    return (
        <div id="about-screen">
            <Box sx={{
                bgcolor: 'black',
                width: '100%',
                height: '100%',
                position: 'absolute'
            }}>
                <button onClick={() =>  setSelectedGame(1)}>Breakout</button>
                <button onClick={() =>  setSelectedGame(2)}>Medication Matching</button>
                <br />
                <canvas ref={gameCanvas} id="gameCanvas"></canvas>
                {/* <Box sx={{
                    top: '5%',
                    left: '5%',
                    height: '90%',
                    width: '90%',
                    position: 'absolute',
                    backgroundImage: 'url("https://github.com/Isabella-Misanes/cse-332-datasets/blob/ad4555391416e53e3c3dffd89ed692dcb6c11030/Welcome_Screen.png?raw=true")',
                    backgroundSize: '100%'
                }}/> */}
            </Box>
            <Sidebar/>
            <BackButton />
        </div>
    );
}