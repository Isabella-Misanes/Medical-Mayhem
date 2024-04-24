import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'

//TODO: might have to add additional middleware that check if the user still exists

export const getProfile = async (req: Request, res: Response) => {
    console.log("getProfile")
    try {
        console.log(req.userId)
        const existingUser = await User.findById(req.userId);
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "User does not exist."
                })
        }

        return res
            .status(200)
            .json({
                bio: existingUser.bio,
                pfp: existingUser.profilePicture
            })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const {username, bio, pfp} = req.body

        let updatedUser

        if (pfp) {
            updatedUser = await User.updateOne(
                {_id: req.userId},
                {$set: {username: username, bio: bio, profilePicture: pfp}}
            );
        }

        else {
            updatedUser = await User.updateOne(
                {_id: req.userId},
                {$set: {username: username, bio: bio}}
            );
        }

        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "User cannot be updated."
                })
        }

        return res.status(200).send()

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const getRecentPlayers = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const recentPlayers: {username: string, profilePicture: string, onlineStatus: boolean}[] = [];
        await Promise.all(currentUser.recentPlayers.map(async (recentPlayerId) => {
            const recentPlayer = await User.findById(recentPlayerId);
            if(recentPlayer) {
                recentPlayers.push({
                    username: recentPlayer.username,
                    profilePicture: recentPlayer.profilePicture,
                    onlineStatus: recentPlayer.onlineStatus
                })
            }
        }));
        return res.status(200).json({players: recentPlayers})
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const getAvatar = async (req: Request, res: Response) => {
    console.log("getAvatar")
    try {
        console.log(req.userId)
        const existingUser = await User.findById(req.userId);
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "User does not exist."
                })
        }

        return res
            .status(200)
            .json({
                pic: existingUser.avatarSprite,
                speed: existingUser.speed,
                strength: existingUser.strength,
                defense: existingUser.defense,
                favoredMinigame: existingUser.favoredMinigame
            })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateAvatar = async (req: Request, res: Response) => {
    try {
        const {pic, speed, strength, defense, favoredMinigame} = req.body

        let updatedUser

        if (pic) {
            updatedUser = await User.updateOne(
                {_id: req.userId},
                {$set: {avatarSprite: pic, speed: speed, strength: strength, defense: defense, favoredMinigame: favoredMinigame}}
            );
        }

        else {
            updatedUser = await User.updateOne(
                {_id: req.userId},
                {$set: {speed: speed, strength: strength, defense: defense, favoredMinigame: favoredMinigame}}
            );
        }

        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "User cannot be updated."
                })
        }

        return res.status(200).send()

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const getSettings = async (req: Request, res: Response) => {
    console.log('Get settings');
    try {
        const user = await User.findOne({_id: req.userId}, {masterVolume: 1, musicVolume: 1, sfxVolume: 1, keybinds: 1});
        if(!user) return res.status(400).send({errorMessage: 'User not found.'});
        console.log(user.keybinds);
        return res.status(200).json({
            masterVolume: user.masterVolume,
            musicVolume: user.musicVolume,
            sfxVolume: user.sfxVolume,
            keybinds: user.keybinds
        })
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateAudioSettings = async (req: Request, res: Response) => {
    console.log('Update audio settings');
    try {
        const {masterVolume, musicVolume, sfxVolume} = req.body;
        const updatedUser = await User.updateOne({_id: req.userId}, {$set: {masterVolume: masterVolume, musicVolume: musicVolume, sfxVolume: sfxVolume}});
        console.log(updatedUser);
        console.log(await User.findOne({username: 'JareBear'}));
        res.status(200).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateKeybinds = async (req: Request, res: Response) => {
    console.log('Update keybinds');
    try {
        const {up, left, down, right, interact} = req.body;
        console.log(up, left, down, right, interact);
        const currUser = await User.findOne({_id: req.userId});
        if(!currUser) return res.status(400).send('User not found.');
        const newKeybinds : Map<string, string> = new Map<string, string>();
        for(const [k, v] of currUser.keybinds.entries()) newKeybinds.set(k, v as string);
        if(up) newKeybinds.set('UP', up);
        if(left) newKeybinds.set('LEFT', left);
        if(down) newKeybinds.set('DOWN', down);
        if(right) newKeybinds.set('RIGHT', right);
        if(interact) newKeybinds.set('INTERACT', interact);
        const updateUser = await User.updateOne({_id: req.userId}, {$set: {keybinds: newKeybinds}});
        console.log(updateUser);
        res.status(200).send();

    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as PlayerController from './player-controller'