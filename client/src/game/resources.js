import { TiledResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Loader } from "excalibur";
import Player from "./actors/player";
import map from './Level_1.tmx'

export const Resources = {
    PlayerPng: new ImageSource('/static/media/Player-1.png'),
    tiledMap: new TiledResource(map, {
        entityClassNameFactories: {
            player: (props) => {
                const player = new Player();
                player.z = 100;
                return player;
            }
        },
    })
}

export const loader = new Loader()
for (let resource of Object.values(Resources))
    loader.addResource(resource)