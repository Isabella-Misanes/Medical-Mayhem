/**
 * Medication Matching:
 * Players will have to match the proper prescription to the patient’s needs.
 * Each patient will have a box that the player has to match the patient’s medication to.
 * The player will have to use their WASD keys and the E key to select the patient’s box
 * and toss in the medication. Alternatively, the mouse and left click can be used to select
 * the patient’s box. Incorrect matching will result in that patient dying. 
 */

import { Engine, Actor, Color, vec, Keys, Text, Font, TextAlign, Timer } from "excalibur";

let points = 0;
const pointText = new Text({
  text: "Points: " + points,
  color: Color.White,
  font: new Font({size: 24, textAlign: TextAlign.Left})
})
let timerSec = 15;
const timerText = new Text({
  text: "Timer: " + timerSec,
  color: Color.White,
  font: new Font({size: 24, textAlign: TextAlign.Left})
})
const timer = new Timer({
  interval: 1000,
  fcn: () => {
    timerSec--;
    timerText.text = "Timer: " + timerSec;
  },
  repeats: true
})
let row = 0;
let col = 0;
const gameWidth = 800;
const gameHeight = 600;
// Pool of possible box colors
const boxColor = [Color.Violet, Color.Orange, Color.Yellow, Color.Viridian, Color.Magenta, Color.Green, Color.Gray, Color.Vermilion, Color.Viridian];
const randomColors = []; // Pool of random colors in the current round
const boxesInfo = [];
let currCoords = {};
let currColor = boxColor[Math.floor(Math.random() * boxColor.length)];

const initializeMeds = (game) => {
  // Padding between medicines
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 60; // y-offset
  const columns = 5;
  const rows = 3;

  // Individual medicine width with padding factored in
  const boxWidth = game.drawWidth / columns - padding - padding / columns; // px
  const boxHeight = game.drawWidth / columns - padding - padding / columns; // px
  const boxes = [];
  for (let j = 0; j < rows; j++) {
    const colCoords = [];
    for (let i = 0; i < columns; i++) {
      let randomColor = boxColor[Math.floor(Math.random() * boxColor.length)];
      if(!randomColors.includes(randomColor)) randomColors.push(randomColor);
      colCoords.push({
        x: xoffset + i * (boxWidth + padding) + padding,
        y: yoffset + j * (boxHeight + padding) + padding,
        color: randomColor
      });
      boxes.push(new Actor({
        x: colCoords[i].x,
        y: colCoords[i].y,
        width: boxWidth,
        height: boxHeight,
        color: randomColor
      }));
    }
    boxesInfo.push(colCoords);
  }

  boxes.forEach(function (box) {
    game.add(box); // Draw on current scene
  });
  return boxes;
};

// 
const initializeSelector = (game) => {
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 60; // y-offset
  const columns = 5;
  const rows = 3;
  const boxWidth = game.drawWidth / columns - padding - padding / columns; // px
  const boxHeight = game.drawWidth / columns - padding - padding / columns; // px
  const selectorSides = [];
  // selectorSides[0] and [2] are horizontal sides, [1] and [3] are vertical
  for(let i = 0; i < 4; i++) {
    selectorSides.push(new Actor({
      x: (i % 2 === 0) ? xoffset + padding : (i === 1 ? padding : 2 * xoffset + padding),
      y: (i % 2 === 0) ? (padding - 7 + (i === 2 ? boxHeight - 4 : 0)) : padding + yoffset,
      width: (i % 2 === 0) ? boxWidth : 5,
      height: (i % 2 === 0) ? 5 : boxHeight,
      color: Color.Red
    }));
  }

  selectorSides.forEach(side => { game.add(side); })
  currCoords.x = xoffset + col * (boxWidth + padding) + padding;
  currCoords.y = yoffset + row * (boxHeight + padding) + padding;
  game.input.keyboard.on('press', (event) => {
    switch(event.key) {
      case Keys.W:
        if(row !== 0) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(0, ((boxHeight + padding) * -1)), 1500);
          })
          row--;
          currCoords.x = xoffset + col * (boxWidth + padding) + padding;
          currCoords.y = yoffset + row * (boxHeight + padding) + padding;
        }
        break;
      case Keys.A:
        if(col !== 0) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec((boxHeight + padding) * -1, 0), 1500);
          })
          col--;
          currCoords.x = xoffset + col * (boxWidth + padding) + padding;
          currCoords.y = yoffset + row * (boxHeight + padding) + padding;
        }
        break;
      case Keys.S:
        if(row !== rows - 1) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(0, boxHeight + padding), 1500);
          })
          row++;
          currCoords.x = xoffset + col * (boxWidth + padding) + padding;
          currCoords.y = yoffset + row * (boxHeight + padding) + padding;
        }
        break;
      case Keys.D:
        if(col !== columns - 1) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(boxHeight + padding, 0), 1500);
          })
          col++;
          currCoords.x = xoffset + col * (boxWidth + padding) + padding;
          currCoords.y = yoffset + row * (boxHeight + padding) + padding;
        }
        break;
      default:
        return;
    }
  })

  return selectorSides;
}

const initializeCurrColor = (game) => {
  const currColorBorder = new Actor({
    x: gameWidth - 100,
    y: gameHeight - 70,
    radius: 55,
    color: Color.Red,
  })
  const currColorCircle = new Actor({
    x: gameWidth - 100,
    y: gameHeight - 70,
    radius: 50,
    color: currColor
  })

  game.add(currColorBorder);
  game.add(currColorCircle);
  
  game.input.keyboard.on('press', (event) => {
    if(event.key === Keys.E) {
      currColorBorder.actions.moveTo(vec(currCoords.x, currCoords.y), 2000);
      currColorCircle.actions.moveTo(vec(currCoords.x, currCoords.y), 2000);
      if(currColor === boxesInfo[row][col].color) {
        points++;
        pointText.text = "Points: " + points;
      }
      currColorBorder.actions.moveTo(vec(gameWidth - 100, gameHeight - 70), 2000);
      currColorCircle.actions.moveTo(vec(gameWidth - 100, gameHeight - 70), 2000).callMethod(() => {
        currColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        currColorCircle.color = currColor;
        if(points === 10) {
          alert("You win!");
          game.stop();
        }
      });
    }
  })
}

const initializeText = (game) => {
  const actor1 = new Actor({pos: vec(170, gameHeight - 30)});
  const instrText = new Text({
    text: 'WASD keys to select box\nE key to place medicine in box',
    color: Color.White,
    font: new Font({size: 24, textAlign: TextAlign.Left})
  });
  const actor2 = new Actor({pos: vec(53, gameHeight - 70)})
  const timeActor = new Actor({pos: vec(55, gameHeight - 95)});
  actor1.graphics.use(instrText);
  actor2.graphics.use(pointText);
  timeActor.graphics.use(timerText);
  game.currentScene.add(actor1);
  game.currentScene.add(actor2);
  game.currentScene.add(timeActor);
}

export const initMedicationMatching = (gameRef, gameCanvasRef) => {
  if (!gameCanvasRef.current) return;

  gameRef.current = new Engine({
    canvasElement: gameCanvasRef.current,
    width: gameWidth,
    height: gameHeight,
  });
  const game = gameRef.current;

  initializeMeds(game);
  initializeSelector(game);
  initializeCurrColor(game);
  initializeText(game);
  game.currentScene.add(timer);
  timer.start();
  game.clock.schedule(() => {
    alert("Time's up!");
    game.stop();
  }, 15000);

  game?.start().catch((e) => console.error(e));
};