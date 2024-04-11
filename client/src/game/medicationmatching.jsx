/**
 * Medication Matching:
 * Players will have to match the proper prescription to the patient’s needs.
 * Each patient will have a box that the player has to match the patient’s medication to.
 * The player will have to use their WASD keys and the E key to select the patient’s box
 * and toss in the medication. Alternatively, the mouse and left click can be used to select
 * the patient’s box. Incorrect matching will result in that patient dying. 
 */

import { Engine, Actor, Color, CollisionType, Input } from "excalibur";

const initializeMeds = (game) => {
  // Padding between medicines
  const padding = 20; // px
  const xoffset = 65; // x-offset
  const yoffset = 60; // y-offset
  const columns = 5;
  const rows = 3;

  const brickColor = [Color.Violet, Color.Orange, Color.Yellow];

  // Individual medicine width with padding factored in
  const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
  const brickHeight = game.drawWidth / columns - padding - padding / columns; // px
  const bricks = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      bricks.push(new Actor({
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding,
        width: brickWidth,
        height: brickHeight,
        color: brickColor[j % brickColor.length],
      }));
    }
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
  // const rows = 3;
  const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
  const brickHeight = game.drawWidth / columns - padding - padding / columns; // px
  const selectorSides = [];
  // selectorSides[0] and [2] are horizontal sides, [1] and [3] are vertical
  for(let i = 0; i < 4; i++) {
    selectorSides.push(new Actor({
      x: (i % 2 === 0) ? xoffset + padding : (i === 1 ? padding : 2 * xoffset + padding),
      y: (i % 2 === 0) ? (padding - 7 + (i === 2 ? brickHeight - 5 : 0)) : padding + yoffset,
      width: (i % 2 === 0) ? brickWidth : 5,
      height: (i % 2 === 0) ? 5 : brickHeight,
      color: Color.Red
    }));
  }

  selectorSides.forEach(side => { game.add(side); })

  game.input.keyboard.on('press', (event) => {
    switch(event.key) {
      case Input.W:
        // TODO: Code to move up
        break;
      case Input.A:
        // TODO: Code to move left
        break;
      case Input.S:
        // TODO: Code to move down
        break;
      case Input.D:
        // TODO: Code to move right
        break;
      default:
        return;
    }
  })

  return selectorSides;
}

export const initMedicationMatching = (gameRef, gameCanvasRef) => {
  if (!gameCanvasRef.current) return;

  gameRef.current = new Engine({
    canvasElement: gameCanvasRef.current,
    width: 800,
    height: 600,
  });
  const game = gameRef.current;

  initializeMeds(game);
  initializeSelector(game);

  game?.start().catch((e) => console.error(e));
};