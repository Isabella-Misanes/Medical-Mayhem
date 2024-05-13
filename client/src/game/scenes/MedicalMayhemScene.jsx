import { Actor, Color, vec, Keys, Text, Font, TextAlign, Timer, Scene, Random } from "excalibur";
import socket from "../../constants/socket";
import SocketEvents from "../../constants/socketEvents";
import Patient from "../actors/patient";

export class MedicalMayhemScene extends Scene {

    patients = [];
    patientCount = 0;

    onInitialize(engine) {
        console.log("INIT MEDICAL MAYHEM");
        this.spawnPatient();

        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })

        socket.on(SocketEvents.TREAT_PATIENT, (data) => {
            this.killPatient(data.id)
        })
    }

    onActivate(context) {
        socket.on(SocketEvents.SPAWN_PATIENT, (data) => {
            this.spawnPatient();
        })
        const random = new Random(1337)
        const timer = new Timer({
            fcn: () => {
                socket.emit(SocketEvents.SPAWN_PATIENT)
            },
            random,
            randomRange: [0, 5000],
            interval: 500,
            repeats: true,
        })
        this.engine.currentScene.add(timer)
        timer.start()
    }

    onDeactivate() {

    }

    spawnPatient() {
        console.log("SPAWN PATIENT");
        this.patientCount++;
        const patient = new Patient(this.patientCount)
        this.engine.add(patient)
        this.patients.push(patient)
    }

    killPatient(id) {
        for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].patientId == id) {
                this.patients[i].kill()
                this.patients.splice(i, 1);
            }
        }
    }

}