// import { Actor, Vector, Color } from "excalibur";
import { Actor, Color } from "excalibur";
import * as ex from 'excalibur'
import{ Config } from './config'
import { Resources } from "../resources";
import socket from "../../constants/socket";
import SocketEvents from "../../constants/socketEvents";

export const PlayerCollisionGroup = ex.CollisionGroupManager.create('player')

export default class Player extends Actor {
    constructor(username, isMyPlayer = false) {
        super({
            z: 100,
            pos: ex.vec(279, 194),
            width: 25,
            height: 25,
            collisionType: ex.CollisionType.Passive,
            color: Color.Chartreuse,
            collisionGroup: PlayerCollisionGroup
        })
        this.isMyPlayer = isMyPlayer // is this a teammate, or the player that the user is currently controlling?
        this.username = username // string
        this.guidingPatient = null // a reference to the patient being guided by the player
        this.posCorrection = null // used to check if the character was moved to the correct position reflected by the player who sent the PLAYER_MOVE event
    }

    onInitialize(engine) {
        const sprite = Resources.PlayerPng.toSprite()
        sprite.scale.setTo(1.5, 1.5)

        this.graphics.use(sprite)

        // EVENT HANDLING

        socket.on(SocketEvents.PLAYER_MOVED, (data) => {
            if (data.username === this.username) {
                this.pos = ex.vec(data.pos._x, data.pos._y)
            }
        })

        this.on('collisionstart', (event) => {
            this.guidingPatient = event.other
            this.guidingPatient.actions.follow(this, 50)
        })
    }

    onPreUpdate(engine, elapsedMs) {

        if (this.isMyPlayer) {
            this.vel = ex.Vector.Zero;

            if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
                this.vel = ex.vec(Config.PlayerSpeed, 0);
                
                //this.graphics.use('right-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
                this.vel = ex.vec(-Config.PlayerSpeed, 0);

                //this.graphics.use('left-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
                this.vel = ex.vec(0, -Config.PlayerSpeed);

                //this.graphics.use('up-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
                this.vel = ex.vec(0, Config.PlayerSpeed);

                //this.graphics.use('down-walk');
            }

            socket.emit(SocketEvents.PLAYER_MOVED, {
                username: this.username,
                pos: this.pos.clone().add(this.vel.clone().scale(elapsedMs / 1000)),
            })
        }
    }
}