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

    let tapped = false;
    let isColliding = false;
    var ball = null;

    game.add(bar);

    game.input.keyboard.on('press', (event) => {
        if(event.key === Keys.Space) {
            bar.color = Color.Green;
            tapped = true;
            setTimeout(() => {
                tapped = false; 
            }, 100);
        }
    });

    bar.on('collisionstart', (evt) => {
        ball = evt.other;
        isColliding = true;
    });

    bar.on('collisionend', (evt) => {
        isColliding = false;
    });

    game.on('postupdate', () => {
        if(isColliding && tapped) {
            if(ball) {
                ball.kill();
            }
        }
    })

    // Timer
    setInterval(() => {
        tapped = false;
        bar.color = Color.Red;
    }, 300);
}

const initProjectile = (game) => {
    const projectile = new Actor({
        x: gameWidth,
        y: Math.max(200, Math.round(Math.random() * 700)),
        radius: 55,
        color: Color.Yellow,
    });

    const projectileSpeed = vec(-600, 0);
    projectile.vel = projectileSpeed;

    projectile.body.collisionType = CollisionType.Passive;

    game.add(projectile);

    projectile.on("postupdate", () => {
        if(projectile.pos.x < -50 || projectile.pos.y < 0 || projectile.pos.x > game.drawWidth || projectile.pos.y > game.drawHeight) {
            projectile.kill();
        }
    });
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

    initializeBar(game);
    initializeText(game);

    const createRandomProjectile = () => {
        const interval = Math.floor(Math.random() * (1500 - 300 + 1)) + 300;
        setTimeout(() => {
            initProjectile(game);
            createRandomProjectile();
        }, interval);
    };

    // Start creating projectiles with a random interval
    createRandomProjectile();

    game?.start().catch((e) => console.error(e));
};