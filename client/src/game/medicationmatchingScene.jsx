/**
 * Medication Matching:
 * Players will have to match the proper prescription to the patient’s needs.
 * Each patient will have a box that the player has to match the patient’s medication to.
 * The player will have to use their WASD keys and the E key to select the patient’s box
 * and toss in the medication. Alternatively, the mouse and left click can be used to select
 * the patient’s box. Incorrect matching will result in that patient dying. 
 */

import { Actor, Color, vec, Keys, Text, Font, TextAlign, Timer, Scene } from "excalibur";

export class medicationmatchingScene extends Scene {
  onInitialize(engine) {
    console.log("INIT MEDICATION MATCHING");

    this.initializeMeds(engine);
    this.initializeSelector(engine);
    this.initializeCurrColor(engine);
    this.initializeText(engine);
    engine.currentScene.add(this.timer);
    this.timer.start();

    // game?.start().catch((e) => console.error(e));
  }

  points;

  onActivate(context) {
    this.timerSec = 15;
    this.points = context.data.score;
    this.pointText.text = "Points: " + this.points;

    setTimeout(() => {
      this.engine.goToScene("game-scene", {sceneActivationData: {score: this.points, time: context.data.time-15}});
    }, 15000);
  }

  onDeactivate() {

  }


  pointText = new Text({
    text: "Points: " + this.points,
    color: Color.White,
    font: new Font({size: 24, textAlign: TextAlign.Left})
  })
  timerSec = 15;
  timerText = new Text({
    text: "Timer: " + this.timerSec,
    color: Color.White,
    font: new Font({size: 24, textAlign: TextAlign.Left})
  })
  timer = new Timer({
    interval: 1000,
    fcn: () => {
      this.timerSec--;
      this.timerText.text = "Timer: " + this.timerSec;
    },
    repeats: true
  })
  row = 0;
  col = 0;
  gameWidth = 800;
  gameHeight = 600;
  // Pool of possible box colors
  boxColor = [Color.Violet, Color.Orange, Color.Yellow, Color.Viridian, Color.Magenta, Color.Green, Color.Gray, Color.Vermilion, Color.Viridian];
  randomColors = []; // Pool of random colors in the current round
  boxesInfo = [];
  currCoords = {};
  currColor = this.boxColor[Math.floor(Math.random() * this.boxColor.length)];

  initializeMeds = (game) => {
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
        let randomColor = this.boxColor[Math.floor(Math.random() * this.boxColor.length)];
        if(!this.randomColors.includes(randomColor)) this.randomColors.push(randomColor);
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
      this.boxesInfo.push(colCoords);
    }

    boxes.forEach(function (box) {
      game.add(box); // Draw on current scene
    });
    return boxes;
  };

   
  initializeSelector = (game) => {
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
    this.currCoords.x = xoffset + this.col * (boxWidth + padding) + padding;
    this.currCoords.y = yoffset + this.row * (boxHeight + padding) + padding;
    game.input.keyboard.on('press', (event) => {
      switch(event.key) {
        case Keys.W:
          if(this.row !== 0) {
            selectorSides.forEach(side => {
              side.actions.moveBy(vec(0, ((boxHeight + padding) * -1)), 1500);
            })
            this.row--;
            this.currCoords.x = xoffset + this.col * (boxWidth + padding) + padding;
            this.currCoords.y = yoffset + this.row * (boxHeight + padding) + padding;
          }
          break;
        case Keys.A:
          if(this.col !== 0) {
            selectorSides.forEach(side => {
              side.actions.moveBy(vec((boxHeight + padding) * -1, 0), 1500);
            })
            this.col--;
            this.currCoords.x = xoffset + this.col * (boxWidth + padding) + padding;
            this.currCoords.y = yoffset + this.row * (boxHeight + padding) + padding;
          }
          break;
        case Keys.S:
          if(this.row !== rows - 1) {
            selectorSides.forEach(side => {
              side.actions.moveBy(vec(0, boxHeight + padding), 1500);
            })
            this.row++;
            this.currCoords.x = xoffset + this.col * (boxWidth + padding) + padding;
            this.currCoords.y = yoffset + this.row * (boxHeight + padding) + padding;
          }
          break;
        case Keys.D:
          if(this.col !== columns - 1) {
            selectorSides.forEach(side => {
              side.actions.moveBy(vec(boxHeight + padding, 0), 1500);
            })
            this.col++;
            this.currCoords.x = xoffset + this.col * (boxWidth + padding) + padding;
            this.currCoords.y = yoffset + this.row * (boxHeight + padding) + padding;
          }
          break;
        default:
          return;
      }
    })

    return selectorSides;
  }

  initializeCurrColor = (game) => {
    const currColorBorder = new Actor({
      x: this.gameWidth - 100,
      y: this.gameHeight - 70,
      radius: 55,
      color: Color.Red,
    })
    const currColorCircle = new Actor({
      x: this.gameWidth - 100,
      y: this.gameHeight - 70,
      radius: 50,
      color: this.currColor
    })

    game.add(currColorBorder);
    game.add(currColorCircle);
    
    game.input.keyboard.on('press', (event) => {
      if(event.key === Keys.E) {
        currColorBorder.actions.moveTo(vec(this.currCoords.x, this.currCoords.y), 2000);
        currColorCircle.actions.moveTo(vec(this.currCoords.x, this.currCoords.y), 2000);
        if(this.currColor === this.boxesInfo[this.row][this.col].color) {
          this.points++;
          this.pointText.text = "Points: " + this.points;
        }
        currColorBorder.actions.moveTo(vec(this.gameWidth - 100, this.gameHeight - 70), 2000);
        currColorCircle.actions.moveTo(vec(this.gameWidth - 100, this.gameHeight - 70), 2000).callMethod(() => {
          this.currColor = this.randomColors[Math.floor(Math.random() * this.randomColors.length)];
          currColorCircle.color = this.currColor;
          if(this.points === 10) {
            // alert("You win!");
            // game.stop();
          }
        });
      }
    })
  }

  initializeText = (game) => {
    const actor1 = new Actor({pos: vec(170, this.gameHeight - 30)});
    const instrText = new Text({
      text: 'WASD keys to select box\nE key to place medicine in box',
      color: Color.White,
      font: new Font({size: 24, textAlign: TextAlign.Left})
    });
    const actor2 = new Actor({pos: vec(53, this.gameHeight - 70)})
    const timeActor = new Actor({pos: vec(55, this.gameHeight - 95)});
    actor1.graphics.use(instrText);
    actor2.graphics.use(this.pointText);
    timeActor.graphics.use(this.timerText);
    game.currentScene.add(actor1);
    game.currentScene.add(actor2);
    game.currentScene.add(timeActor);
  }
}