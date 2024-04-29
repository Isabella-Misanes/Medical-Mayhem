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
            collisionType: ex.CollisionType.Active,
            color: Color.Chartreuse,
            collisionGroup: PlayerCollisionGroup
        })
        this.isMyPlayer = isMyPlayer // is this a teammate, or the player that the user is currently controlling?
        this.username = username // string
        this.guidingPatient = null // a reference to the patient being guided by the player
        this.posCorrection = null
    }

    onInitialize(engine) {
        const sprite = Resources.PlayerPng.toSprite()
        sprite.scale.setTo(1.5, 1.5)

        this.graphics.use(sprite)

        // EVENT HANDLING

        socket.on(SocketEvents.PLAYER_MOVED, (data) => {

            // console.log(data)
            if (data.username === this.username) {
                this.vel = ex.vec(data.vel._x, data.vel._y)
                this.posCorrection = data.pos
            }
        })

        socket.on(SocketEvents.STOP_FOLLOW, (data) => {

            // console.log(data)
            if (data.username === this.username) {
                if (this.guidingPatient !== null) {
                    this.guidingPatient.actions.clearActions();
                    this.guidingPatient = null;
                }
            }
        })

        this.on('collisionstart', (event) => {
            if (event.other.name !== "Tile Layer 2") {
                this.guidingPatient = event.other
                this.guidingPatient.actions.follow(this, 50)
            }
        })
    }

    onPreUpdate(engine, elapsedMs) {

        if (this.isMyPlayer) {
            this.vel = ex.Vector.Zero;

            if (engine.input.keyboard.isHeld(ex.Keys.D)) {
                this.vel = ex.vec(Config.PlayerSpeed, 0);
                
                //this.graphics.use('right-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.A)) {
                this.vel = ex.vec(-Config.PlayerSpeed, 0);

                //this.graphics.use('left-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.W)) {
                this.vel = ex.vec(0, -Config.PlayerSpeed);

                //this.graphics.use('up-walk');
            }
            if (engine.input.keyboard.isHeld(ex.Keys.S)) {
                this.vel = ex.vec(0, Config.PlayerSpeed);

                //this.graphics.use('down-walk');
            }
            if (engine.input.keyboard.wasPressed(ex.Keys.E) && this.guidingPatient !== null) {
                this.guidingPatient.actions.clearActions();

                let tilePath = engine.currentScene.world.scene.tileMaps[0].getTileByPoint(this.guidingPatient.pos)._graphics[0].image.path;
                console.log(tilePath); 
                // 17, 18, 19, 20, 21
                if (tilePath === "/static/media/Hospital_Tiles-17.png" || tilePath === "/static/media/Hospital_Tiles-18.png" || tilePath === "/static/media/Hospital_Tiles-19.png" || tilePath === "/static/media/Hospital_Tiles-20.png" || tilePath === "/static/media/Hospital_Tiles-21.png") {
                    console.log("START MINIGAME");
                }
                socket.emit(SocketEvents.STOP_FOLLOW, {
                    username: this.username,
                })
                this.guidingPatient = null;
            }

            socket.emit(SocketEvents.PLAYER_MOVED, {
                username: this.username,
                vel: this.vel,
                pos: this.pos.clone().add(this.vel.clone().scale(elapsedMs / 1000)),
            })
        }
    }

    onPostUpdate(engine, elapsedMs) {
        if(this.posCorrection && 
            (this.pos.x !== this.posCorrection._x || 
            this.pos.y !== this.posCorrection._y)) {
                this.pos = ex.vec(this.posCorrection._x, this.posCorrection._y)
                this.posCorrection = null
            }
    }
}