/**
 * Heartbeat Rhythm
 */

import { Engine, Actor, Color, CollisionType, vec, Keys, Text, Font, TextAlign, Scene } from "excalibur";

export class heartbeatrhythmScene extends Scene {

    engine;
    timeText;
    score;

    onInitialize(engine) {
        console.log("STARTING HEARTBEAT GAME");
        this.initializeText(engine);
        this.initializeTimeText(engine);
        this.score = this.initializeScore(this.engine);
        this.initializeBar(engine, this.score);
        const createRandomProjectile = () => {
            const interval = Math.floor(Math.random() * (1500 - 300 + 1)) + 300;
            setTimeout(() => {
                if (this.timeText.time > 0) {
                    this.initProjectile(this.engine, this.score);   
                }
                createRandomProjectile();
            }, interval);
        };
        createRandomProjectile();
        this.engine = engine;
    }

    onActivate(context) {
        this.timeText.time = 30;
        this.score.val = context.data.score;
  
        setTimeout(() => {
            this.engine.goToScene("game-scene-2", {sceneActivationData: {score: this.score.val, time: context.data.time-30}});
        }, 30000);
  
      //   engine?.start().catch((e) => console.error(e));
    }

    onDeactivate() {
        
    }

    gameHeight = 750;
    gameWidth = 1000;

    initializeBar (game, score) {
        const bar = new Actor({
            x: 100,
            y: this.gameHeight/2,
            color: Color.Red,
            width: 10,
            height: this.gameHeight
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
                    this.score.val += 100;
                    this.score.text.text = 'Score: ' + this.score.val;
                }
            }
        })

        // Timer
        setInterval(() => {
            tapped = false;
            bar.color = Color.Red;
        }, 300);
    }

    initProjectile (game, score) {
        const projectile = new Actor({
            x: this.gameWidth,
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
                if(this.score.val > 0) {
                    this.score.val -= 50
                    this.score.text.text = 'Score: ' + this.score.val;
                }
            }
        });
    }

    initializeText (game) {
        const actor = new Actor({pos: vec(this.gameWidth/2, this.gameHeight-30)});
        const instrText = new Text({
            text: 'Press the Space bar when the circle reaches the vertical line.',
            color: Color.White,
            font: new Font({size: 24, textAlign: TextAlign.Left})
        });
        actor.graphics.use(instrText);
        game.currentScene.add(actor);
    }

    initializeTimeText (game) {
        this.timeText = new Actor({pos: vec(this.gameWidth-100, 30)});
        this.timeText.time = 30;
        this.timeText.text = new Text({
            text: 'Time left: ' + this.timeText.time + ' sec',
            color: Color.White,
            font: new Font({size: 14, textAlign: TextAlign.Left})
        });
        this.timeText.graphics.use(this.timeText.text);
        game.currentScene.add(this.timeText);

        setInterval(() => {
            this.timeText.time -= 1;
            if(this.timeText.time >= 0) {
                this.timeText.text.text= 'Time left: ' + this.timeText.time + ' sec';
            }
        }, 1000);
    }

    initializeScore = (game) => {
        const score = new Actor({pos: vec(this.gameWidth/2, 30)});
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
}