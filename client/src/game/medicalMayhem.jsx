import { Engine } from "excalibur";
import { medicationmatchingScene } from "./medicationmatchingScene";
import { heartbeatrhythmScene } from "./heartbeatrhythmScene";
import { gameResultsScene } from "./gameResultsScene";
import { Loader } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import map from './Level_1.tmx'
import Player from "./actors/player";
import { Resources, loader } from "./resources";
import Patient from "./actors/patient";

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
  
    // const tiledMap = new TiledResource(map, {
    //     entityClassNameFactories: {
    //         player: (props) => {
    //             const player = new Player();
    //             player.z = 100;
    //             return player;
    //         }
    //     },
    // })

    // const loader = new Loader([tiledMap])

    gameRef.current = new Engine({
        canvasElement: gameCanvasRef.current,
        width: gameWidth,
        height: gameHeight,
        debug: true
    });
    const engine = gameRef.current;

    const player = new Player()
    engine.add(player)
    const patient = new Patient()
    engine.add(patient)

    engine.add("heartbeatrhythm", new heartbeatrhythmScene());
    engine.add("medicationmatching", new medicationmatchingScene());
    engine.add("gameresults", new gameResultsScene());

    let gameSequence = ["heartbeatrhythm", "medicationmatching", "heartbeatrhythm", "gameresults"];

    //engine.goToScene(gameSequence[0], {sceneActivationData: {yourScore: 0, opponentScore: 0, games: gameSequence}});

    engine.start(loader).then(() => {
        Resources.tiledMap.addToScene(engine.currentScene)
    });

  };