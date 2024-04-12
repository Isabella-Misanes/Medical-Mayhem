/**
 * Heartbeat Rhythm
 */

import { Engine, Actor, Color, CollisionType, vec, Keys, Text, Font, TextAlign } from "excalibur";

const gameWidth = 1000;
const gameHeight = 750;

const initializeBar = (game, score) => {
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
                score.val += 100;
                score.text.text = 'Score: ' + score.val;
            }
        }
    })

    // Timer
    setInterval(() => {
        tapped = false;
        bar.color = Color.Red;
    }, 300);
}

const initProjectile = (game, score) => {
    const projectile = new Actor({
        x: gameWidth,
        y: Math.max(200, Math.round(Math.random() * 600)),
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
            if(score.val > 0) {
                score.val -= 50
                score.text.text = 'Score: ' + score.val;
            }
        }
    });
}

const initializeText = (game) => {
    const actor = new Actor({pos: vec(gameWidth/2, gameHeight-30)});
    const instrText = new Text({
        text: 'Press the Space bar when the circle reaches the vertical line.',
        color: Color.White,
        font: new Font({size: 24, textAlign: TextAlign.Left})
    });
    actor.graphics.use(instrText);
    game.currentScene.add(actor);
}

const initializeTimeText = (game) => {
    const timeText = new Actor({pos: vec(gameWidth-100, 30)});
    timeText.time = 30;
    timeText.text = new Text({
        text: 'Time left: ' + timeText.time + ' sec',
        color: Color.White,
        font: new Font({size: 14, textAlign: TextAlign.Left})
    });
    timeText.graphics.use(timeText.text);
    game.currentScene.add(timeText);

    setInterval(() => {
        timeText.time -= 1;
        if(timeText.time >= 0) {
            timeText.text.text = 'Time left: ' + timeText.time + ' sec';
        }
    }, 1000);
}

const initializeScore = (game) => {
    const score = new Actor({pos: vec(gameWidth/2, 30)});
    score.val = 0;
    score.text = new Text({
        text: 'Score: ' + score.val,
        color: Color.White,
        font: new Font({size: 24, textAlign: TextAlign.Left})
    });
    score.graphics.use(score.text);
    game.currentScene.add(score);
    return score;
}

export const initHeartbeat = (gameRef, gameCanvasRef) => {
    if (!gameCanvasRef.current) return;

    gameRef.current = new Engine({
        canvasElement: gameCanvasRef.current,
        width: gameWidth,
        height: gameHeight,
    });
    const game = gameRef.current;

    initializeText(game);
    const score = initializeScore(game);
    initializeBar(game, score);
    initializeTimeText(game);

    const createRandomProjectile = () => {
        const interval = Math.floor(Math.random() * (1500 - 300 + 1)) + 300;
        setTimeout(() => {
            initProjectile(game, score);
            createRandomProjectile();
        }, interval);
    };

    createRandomProjectile();

    setTimeout(() => {
        game.stop();
    }, 30000);

    game?.start().catch((e) => console.error(e));
};