import { Actor, Color, vec, Keys, Text, Font, TextAlign, Timer, Scene, Random } from "excalibur";
import socket from "../../constants/socket";
import SocketEvents from "../../constants/socketEvents";
import Patient from "../actors/patient";

export class MedicalMayhemScene extends Scene {

    patients = [];
    patientCount = 0;
    patientCounter = 3;

    onInitialize(engine) {
        console.log("INIT MEDICAL MAYHEM");
        this.spawnPatient();

        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })

        socket.on(SocketEvents.TREAT_PATIENT, (data) => {
            this.killPatient(data.patient)
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
    }

    onActivate(context) {
        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })
        const timer = new Timer({
            fcn: () => {
                socket.emit(SocketEvents.SPAWN_PATIENT)
            },
            randomRange: [5000, 10000],
            interval: 4000,
            repeats: true,
        })
        this.engine.currentScene.add(timer)
        timer.start()
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

}