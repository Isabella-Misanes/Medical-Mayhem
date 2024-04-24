import { Actor, Vector, Color } from "excalibur";
import * as ex from 'excalibur'
import{ Config } from './config'
import { Resources } from "../resources";

export default class Patient extends Actor {
    constructor(pos) {
        super({
            z: 100,
            pos: ex.vec(20, 540),
            width: 100,
            height: 100,
            collisionType: ex.CollisionType.Active,
            color: Color.Chartreuse
        })
    }

    onInitialize(engine) {
        const sprite = Resources.PatientPng.toSprite()
        sprite.scale.setTo(1.5, 1.5)

        this.graphics.use(sprite)
    }

    onPreUpdate(engine, elapsedMs) {
        this.vel = ex.Vector.Zero;

        // POSITION FOR PATIENTS: X 20 Y 540 

        // if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
        //     this.vel = ex.vec(Config.PlayerSpeed, 0);
        //     //this.graphics.use('right-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
        //     this.vel = ex.vec(-Config.PlayerSpeed, 0);
        //     //this.graphics.use('left-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
        //     this.vel = ex.vec(0, -Config.PlayerSpeed);
        //     //this.graphics.use('up-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
        //     this.vel = ex.vec(0, Config.PlayerSpeed);
        //     //this.graphics.use('down-walk');
        // }
    }
}