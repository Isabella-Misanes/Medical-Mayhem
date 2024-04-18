import { Engine } from "excalibur";
import { medicationmatchingScene } from "./medicationmatchingScene";
import { heartbeatrhythmScene } from "./heartbeatrhythmScene";

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
  
    gameRef.current = new Engine({
      canvasElement: gameCanvasRef.current,
      width: gameWidth,
      height: gameHeight,
    });
    const engine = gameRef.current;
  
    // game.currentScene.add(timer);
    // timer.start();
    // game.clock.schedule(() => {
    //   alert("Time's up!");
    //   game.stop();
    // }, 15000);
  
    // initHeartbeat(gameRef, gameCanvasRef);
    // initMedicationMatching(gameRef, gameCanvasRef);

    engine.add("heartbeatrhythm", new heartbeatrhythmScene());
    engine.add("medicationmatching", new medicationmatchingScene())
    engine.goToScene("medicationmatching", {sceneActivationData: {yourScore: 0, opponentScore: 0, time: 120}});

    engine.start();

  };