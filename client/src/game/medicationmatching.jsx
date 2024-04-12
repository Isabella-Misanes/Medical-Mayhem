/**
 * Medication Matching:
 * Players will have to match the proper prescription to the patient’s needs.
 * Each patient will have a box that the player has to match the patient’s medication to.
 * The player will have to use their WASD keys and the E key to select the patient’s box
 * and toss in the medication. Alternatively, the mouse and left click can be used to select
 * the patient’s box. Incorrect matching will result in that patient dying. 
 */

import { Engine, Actor, Color, CollisionType, vec, Keys, Text, Font, TextAlign } from "excalibur";

const gameWidth = 800;
const gameHeight = 600;
const brickColor = [Color.Violet, Color.Orange, Color.Yellow, Color.Viridian, Color.Magenta, Color.Green, Color.Gray, Color.Vermilion, Color.Viridian];
const randomColors = [];
const boxCoordinates = [];
let currCoords = {};
let currColor = brickColor[Math.floor(Math.random() * brickColor.length)];

const initializeMeds = (game) => {
  // Padding between medicines
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 60; // y-offset
  const columns = 5;
  const rows = 3;

  // Individual medicine width with padding factored in
  const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
  const brickHeight = game.drawWidth / columns - padding - padding / columns; // px
  const bricks = [];
  for (let j = 0; j < rows; j++) {
    const colCoords = [];
    for (let i = 0; i < columns; i++) {
      let randomColor = brickColor[Math.floor(Math.random() * brickColor.length)];
      randomColors.push(randomColor);
      colCoords.push({
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding
      });
      bricks.push(new Actor({
        x: colCoords[i].x,
        y: colCoords[i].y,
        width: brickWidth,
        height: brickHeight,
        color: randomColor
      }));
    }
    boxCoordinates.push(colCoords);
  }

  bricks.forEach(function (brick) {
    // Make sure that bricks can participate in collisions
    brick.body.collisionType = CollisionType.Active;

    // Add the brick to the current scene to be drawn
    game.add(brick);
  });
  return bricks;
};

// 
const initializeSelector = (game) => {
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 60; // y-offset
  const columns = 5;
  const rows = 3;
  const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
  const brickHeight = game.drawWidth / columns - padding - padding / columns; // px
  const selectorSides = [];
  // selectorSides[0] and [2] are horizontal sides, [1] and [3] are vertical
  for(let i = 0; i < 4; i++) {
    selectorSides.push(new Actor({
      x: (i % 2 === 0) ? xoffset + padding : (i === 1 ? padding : 2 * xoffset + padding),
      y: (i % 2 === 0) ? (padding - 7 + (i === 2 ? brickHeight - 4 : 0)) : padding + yoffset,
      width: (i % 2 === 0) ? brickWidth : 5,
      height: (i % 2 === 0) ? 5 : brickHeight,
      color: Color.Red
    }));
  }

  selectorSides.forEach(side => { game.add(side); })

  let row = 0;
  let col = 0;
  currCoords.x = xoffset + col * (brickWidth + padding) + padding;
  currCoords.y = yoffset + row * (brickHeight + padding) + padding;
  game.input.keyboard.on('press', (event) => {
    switch(event.key) {
      case Keys.W:
        if(row !== 0) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(0, ((brickHeight + padding) * -1)), 1500);
          })
          row--;
          currCoords.x = xoffset + col * (brickWidth + padding) + padding;
          currCoords.y = yoffset + row * (brickHeight + padding) + padding;
        }
        break;
      case Keys.A:
        if(col !== 0) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec((brickHeight + padding) * -1, 0), 1500);
          })
          col--;
          currCoords.x = xoffset + col * (brickWidth + padding) + padding;
          currCoords.y = yoffset + row * (brickHeight + padding) + padding;
        }
        break;
      case Keys.S:
        if(row !== rows - 1) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(0, brickHeight + padding), 1500);
          })
          row++;
          currCoords.x = xoffset + col * (brickWidth + padding) + padding;
          currCoords.y = yoffset + row * (brickHeight + padding) + padding;
        }
        break;
      case Keys.D:
        if(col !== columns - 1) {
          selectorSides.forEach(side => {
            side.actions.moveBy(vec(brickHeight + padding, 0), 1500);
          })
          col++;
          currCoords.x = xoffset + col * (brickWidth + padding) + padding;
          currCoords.y = yoffset + row * (brickHeight + padding) + padding;
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
      currColorBorder.actions.moveTo(vec(gameWidth - 100, gameHeight - 70), 2000);
      currColorCircle.actions.moveTo(vec(gameWidth - 100, gameHeight - 70), 2000).callMethod(() => {
        currColor = randomColors[Math.floor(Math.random() * brickColor.length)];
        currColorCircle.color = currColor;
      });
    }
  })
}

const initializeText = (game) => {
  const actor = new Actor({pos: vec(170, gameHeight - 30)});
  const instrText = new Text({
    text: 'WASD keys to select box\nE key to place medicine in box',
    color: Color.White,
    font: new Font({size: 24, textAlign: TextAlign.Left})
  });
  actor.graphics.use(instrText);
  game.currentScene.add(actor);
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

  game?.start().catch((e) => console.error(e));
};