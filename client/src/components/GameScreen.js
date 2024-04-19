import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
// import { Engine } from "excalibur";
import { useEffect, useRef } from "react";
import { initMedicalMayhem } from '../game/medicalMayhem';
import { socket } from '../components/HomeScreen'
import SocketEvents from '../constants/socketEvents';

export default function GameScreen() {
    const gameCanvas = useRef(null);
	const gameRef = useRef();

    useEffect(() => {
		if (!gameRef.current && gameCanvas.current) {
			initMedicalMayhem(gameRef, gameCanvas);
		}

        socket.on(SocketEvents.OPPONENT_SCORE_CHANGE, (data) => {

            gameRef.current.scenes.heartbeatrhythm.opponentScore.text.text = 
                "Opponent Score: " + data
        })
	}, []);

    return (
        <div id="about-screen">
            <Box sx={{
                bgcolor: 'black',
                width: '100%',
                height: '100%',
                position: 'absolute'
            }}>
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