import { Actor, Color, vec, Keys, Text, Font, TextAlign, Timer, Scene, Random } from "excalibur";
import socket from "../../constants/socket";
import SocketEvents from "../../constants/socketEvents";
import Patient from "../actors/patient";

export class MedicalMayhemScene extends Scene {

    patients = [];
    patientCount = 0;
    patientCounter = 3;

    score;
    teamScore;
    username;

    onInitialize(engine) {

        setTimeout(() => {
            this.engine.goToScene("gameresults", {sceneActivationData: {yourScore: this.score.val, teamScore: this.teamScore.val}});
        }, 180000);

        console.log("INIT MEDICAL MAYHEM");
        this.spawnPatient();

        this.score = this.initializeScore(engine);
        this.teamScore = this.initializeTeamScore(engine);

        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })

        socket.on(SocketEvents.TREAT_PATIENT, (data) => {
            this.killPatient(data.patient)
        })

        socket.on(SocketEvents.SCORE_CHANGE, (data) => {
            this.teamScore.val = data
        })

        socket.on(SocketEvents.STOP_FOLLOW, (data) => {
            // console.log(data)
            for (let i = 0; i < this.patients.length; i++) {
                if (this.patients[i].patientId === data.id) {
                    this.patients[i].setFollowing(false);
                }
            }
        })

        socket.on(SocketEvents.START_TREAT_PATIENT, (data) => {
            console.log(data)
            for (let i = 0; i < this.patients.length; i++) {
                if (this.patients[i].patientId === data.patient) {
                    this.patients[i].setTreating(true);
                }
            }
        })

        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })
        
        socket.on(SocketEvents.SWITCH_TO_MEDICATION_MATCHING, (data) => {
            console.log("MED MATCHING");
            console.log(this.username);
            if (data.username == this.username) this.engine.goToScene("medicationmatching", {sceneActivationData: {yourScore: this.score.val, teamScore: this.teamScore.val, username: this.username}});
        })

        socket.on(SocketEvents.SWITCH_TO_HEARTBEAT, (data) => {
            if (data.username == this.username) this.engine.goToScene("heartbeatrhythm", {sceneActivationData: {yourScore: this.score.val, teamScore: this.teamScore.val, username: this.username}});
        })
    
        const timer = new Timer({
            fcn: () => {
                socket.emit(SocketEvents.SPAWN_PATIENT)
            },
            randomRange: [5000, 15000],
            interval: 10000,
            repeats: true,
        })

        this.engine.currentScene.add(timer)
        timer.start()
    }
    onActivate(context) {
        // Set personal and team scores and update the ui text
        console.log("HEREEE");
        console.log(context);
        if (context.data.yourScore) this.score.val = context.data.yourScore
        if (context.data.teamScore) this.teamScore.val = context.data.teamScore
        if (context.data.username) this.username = context.data.username
    }

    onDeactivate() {

    }

    spawnPatient() {
        this.patientCounter++;
        if (this.patientCounter == 4) {
            this.patientCounter = 0;
            console.log("SPAWN PATIENT");
            this.patientCount++;
            const patient = new Patient(this.patientCount)
            this.engine.add(patient)
            this.patients.push(patient)
        }
    }

    killPatient(id) {
        console.log("KILLING: " + id);
        for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].patientId == id) {
                this.patients[i].kill()
                this.patients.splice(i, 1);
            }
        }
    }

    initializeScore = (game) => {
        const score = new Actor({pos: vec(500, 30), anchor: vec(0, 0), z: 10000});
        score.val = 0;
        score.text = new Text({
            text: 'Score: ' + score.val,
            color: Color.Black,
            font: new Font({size: 24, textAlign: TextAlign.Left})
        });
        score.graphics.use(score.text);
        game.currentScene.add(score);
        return score;
    }

    initializeTeamScore = (game) => {
        console.log("TEAM SCORE");
        const teamScore = new Actor({pos: vec(500, 60), anchor: vec(0, 0), z: 10000});
        teamScore.val = 0;
        teamScore.text = new Text({
            text: 'Team Score: ' + teamScore.val,
            color: Color.Black,
            font: new Font({size: 24, textAlign: TextAlign.Left})
        });
        teamScore.graphics.use(teamScore.text);
        game.currentScene.add(teamScore);
        return teamScore;
    }

}