import { Engine } from "excalibur";
import { medicationmatchingScene } from "./medicationmatchingScene";
import { heartbeatrhythmScene } from "./heartbeatrhythmScene";
import { gameResultsScene } from "./gameResultsScene";
import { Loader } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import * as map from './assets/Level_1.tmx'

const gameWidth = 1000;
const gameHeight = 750;
// const timer = new Timer({
//     interval: 1000,
//     fcn: () => {
//       timerSec--;
//       timerText.text = "Timer: " + timerSec;
//     },
//     repeats: true
//   })

export const initMedicalMayhem = (gameRef, gameCanvasRef) => {
    if (!gameCanvasRef.current) return;
  
    const tiledMap = new TiledResource('assets/Level_1.tmx')
    const loader = new Loader([tiledMap])

    gameRef.current = new Engine({
        canvasElement: gameCanvasRef.current,
        width: gameWidth,
        height: gameHeight,
    });
    const engine = gameRef.current;

    engine.add("heartbeatrhythm", new heartbeatrhythmScene());
    engine.add("medicationmatching", new medicationmatchingScene());
    engine.add("gameresults", new gameResultsScene());

    let gameSequence = ["heartbeatrhythm", "medicationmatching", "heartbeatrhythm", "gameresults"];

    //engine.goToScene(gameSequence[0], {sceneActivationData: {yourScore: 0, opponentScore: 0, games: gameSequence}});

    engine.start(loader).then(() => {
        tiledMap.addToScene(engine.currentScene)
    });

  };