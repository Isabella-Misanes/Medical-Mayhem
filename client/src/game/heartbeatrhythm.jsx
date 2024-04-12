/**
 * Heartbeat Rhythm
 */

import { Engine, Actor, Color, CollisionType, vec, Keys, Text, Font, TextAlign } from "excalibur";

const gameWidth = 1000;
const gameHeight = 750;

const initializeBar = (game) => {
    const bar = new Actor({
        x: 100,
        y: gameHeight/2,
        color: Color.Red,
        width: 10,
        height: gameHeight
    });

    bar.body.collisionType = CollisionType.Fixed;

    game.add(bar);

    game.input.keyboard.on('press', (event) => {
        if(event.key === Keys.Space) {
            bar.color = Color.Green;
        }
    });
}

const initProjectile = (game) => {
    const projectile = new Actor({
        x: gameWidth,
        y: Math.max(200, Math.round(Math.random() * 700)),
        radius: 55,
        color: Color.Yellow,
    });

    const projectileSpeed = vec(-500, 0);
    setTimeout(() => {
        // Set the velocity in pixels per second
        projectile.vel = projectileSpeed;
    }, 500);

    projectile.body.collisionType = CollisionType.Passive;

    game.add(projectile);

    projectile.on("postupdate", () => {
        if(projectile.pos.x < -50 || projectile.pos.y < 0 || projectile.pos.x > game.drawWidth || projectile.pos.y > game.drawHeight) {
            this.kill();
        }
    });

    return projectile;
}

const initializeText = (game) => {
  const actor = new Actor({pos: vec(gameWidth/2, 30)});
  const instrText = new Text({
    text: 'Press the Space bar when the circle reaches the vertical line.',
    color: Color.White,
    font: new Font({size: 24, textAlign: TextAlign.Left})
  });
  actor.graphics.use(instrText);
  game.currentScene.add(actor);
}

export const initHeartbeat = (gameRef, gameCanvasRef) => {
    if (!gameCanvasRef.current) return;

    gameRef.current = new Engine({
        canvasElement: gameCanvasRef.current,
        width: gameWidth,
        height: gameHeight,
    });
    const game = gameRef.current;

    const projectile = initProjectile(game);
    initializeBar(game);
    initializeText(game);

    projectile.on("collisionstart", function (ev) {
        // kill removes an actor from the current scene
        // therefore it will no longer be drawn or updated
        console.log("collision start");
        
    });

    projectile.on("collisionend", () => {
        // ball has separated from whatever object it was colliding with
        
    });
    
      // Loss condition
    projectile.on("exitviewport", () => {
        projectile.kill();
    });

    game?.start().catch((e) => console.error(e));
};