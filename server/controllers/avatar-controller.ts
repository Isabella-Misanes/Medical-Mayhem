import { Request, Response } from 'express';
import { User } from '../models/user'
import { Avatar } from '../models/avatar';

export const getAllAvatars = async (req: Request, res: Response) => {
    console.log("get all avatars");
    
    try {
        const avatars = await Avatar.find({isPublic: true});

        if(!avatars) {
            return res.status(404).json({errorMessage: 'Avatars not found.'});
        }
        else {
            const avatarList = avatars.map(avatar => ({
                avatarSprite: avatar.avatarSprite,
                avatarName: avatar.avatarName,
                speed: avatar.speed,
                strength: avatar.strength,
                defense: avatar.defense,
                favoredMinigame: avatar.favoredMinigame,
                author: avatar.author,
                comments: avatar.comments,
            }));
            return res.status(200).json({avatarList: avatarList})
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as AvatarController from './avatar-controller'