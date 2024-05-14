/**
 * Game results
 */

// import { Actor, Color, CollisionType, vec, Keys, Text, Font, TextAlign, Scene } from "excalibur";
import { Actor, Color, vec, Text, Font, TextAlign, Scene } from "excalibur";

export class GameResultsScene extends Scene {

    onInitialize(engine) {
        console.log("STARTING RESULTS SCREEN");
        this.engine = engine;
        this.initializeText(engine);
        this.yourScore = this.initializeScore(this.engine);
        this.teamScore = this.initializeTeamScore(this.engine);
    }

    yourScore;
    teamScore;
    engine;
    gameWidth = 1000;
    gameHeight = 750;

    onActivate(context) {
        console.log(context);
        this.yourScore.val = context.data.yourScore;
        this.teamScore.val = context.data.teamScore;
        this.yourScore.text.text = 'Team Score: ' + this.teamScore.val;
        this.teamScore.text.text = 'Your Score: ' + this.yourScore.val;

        // SEND GAME DATA TO DB
        
    }

    onDeactivate() {
        
    }

    initializeText (game) {
        const actor = new Actor({pos: vec(this.gameWidth/2, this.gameHeight/2-40)});
        const instrText = new Text({
            text: 'Game over!',
            color: Color.White,
            font: new Font({size: 80, textAlign: TextAlign.Left})
        });
        actor.graphics.use(instrText);
        game.currentScene.add(actor);
    }

    initializeScore = (game) => {
        const score = new Actor({pos: vec(this.gameWidth/2, this.gameHeight/2 + 50)});
        score.val = 0;
        score.text = new Text({
            text: 'Score: ' + score.val,
            color: Color.White,
            font: new Font({size: 30, textAlign: TextAlign.Left})
        });
        score.graphics.use(score.text);
        game.currentScene.add(score);
        return score;
    }

    initializeTeamScore = (game) => {
        const teamScore = new Actor({pos: vec(this.gameWidth/2, this.gameHeight/2 + 85)});
        teamScore.val = 0;
        teamScore.text = new Text({
            text: 'Opponent Score: ' + teamScore.val,
            color: Color.White,
            font: new Font({size: 30, textAlign: TextAlign.Left})
        });
        teamScore.graphics.use(teamScore.text);
        game.currentScene.add(teamScore);
        return teamScore;
    }

}