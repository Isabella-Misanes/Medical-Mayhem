import { BoundingBox, CollisionType, Engine } from "excalibur";
import { MedicationMatchingScene } from "./scenes/MedicationMatchingScene";
import { HeartbeatRhythmScene } from "./scenes/HeartbeatRhythmScene";
import { GameResultsScene } from "./scenes/GameResultsScene";
import { Loader, DisplayMode, Camera } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import map from './Level_1.tmx'
import Player from "./actors/player";
import { Resources, loader } from "./resources";
import Patient from "./actors/patient";

const gameWidth = 1820;
const gameHeight = 950;
// const timer = new Timer({
//     interval: 1000,
//     fcn: () => {
//       timerSec--;
//       timerText.text = "Timer: " + timerSec;
//     },
//     repeats: true
//   })

export const MedicalMayhem = (gameRef, gameCanvasRef) => {
    if (!gameCanvasRef.current) return;

    //const loader = new Loader([tiledMap])

    gameRef.current = new Engine({
        canvasElement: gameCanvasRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        displayMode: DisplayMode.FullScreen,
    });
    const engine = gameRef.current;
    
    const player = new Player()
    engine.add(player)
    
    const patient = new Patient()
    engine.add(patient)

    const camera = new Camera()
    camera.strategy.lockToActor(player)
    camera.zoom = 2.5
    camera.strategy.limitCameraBounds(new BoundingBox(0, 8, 985, 640))

    engine.currentScene.camera = camera

    // engine.add("heartbeatrhythm", new HeartbeatRhythmScene());
    // engine.add("medicationmatching", new MedicationMatchingScene());
    // engine.add("gameresults", new GameResultsScene());

    // let gameSequence = ["heartbeatrhythm", "medicationmatching", "heartbeatrhythm", "gameresults"];

    // engine.goToScene(gameSequence[0], {sceneActivationData: {yourScore: 0, opponentScore: 0, games: gameSequence}});

    engine.showDebug = true
    engine.start(loader).then(() => {
        Resources.tiledMap.addToScene(engine.currentScene)
    });

  };