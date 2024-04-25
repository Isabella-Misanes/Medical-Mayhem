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
        const existingUser = await User.findById(req.userId);
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
        const user = await User.findOne({_id: req.userId}, {masterVolume: 1, musicVolume: 1, sfxVolume: 1, keybinds: 1, appearAsOffline: 1, toggleChat: 1, toggleParty: 1});
        if(!user) return res.status(400).send({errorMessage: 'User not found.'});
        return res.status(200).json({
            masterVolume: user.masterVolume,
            musicVolume: user.musicVolume,
            sfxVolume: user.sfxVolume,
            keybinds: user.keybinds,
            appearAsOffline: user.appearAsOffline,
            toggleChat: user.toggleChat,
            toggleParty: user.toggleParty,
        })
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateAudioSettings = async (req: Request, res: Response) => {
    try {
        const {masterVolume, musicVolume, sfxVolume} = req.body;
        await User.updateOne({_id: req.userId}, {$set: {masterVolume: masterVolume, musicVolume: musicVolume, sfxVolume: sfxVolume}});
        res.status(200).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateKeybinds = async (req: Request, res: Response) => {
    try {
        const {up, left, down, right, interact} = req.body;
        const currUser = await User.findOne({_id: req.userId});
        if(!currUser) return res.status(400).send('User not found.');
        const newKeybinds : Map<string, string> = new Map<string, string>([
            ['UP', up || currUser.keybinds.get('UP')],
            ['LEFT', left || currUser.keybinds.get('LEFT')],
            ['DOWN', down || currUser.keybinds.get('DOWN')],
            ['RIGHT', right || currUser.keybinds.get('RIGHT')],
            ['INTERACT', interact || currUser.keybinds.get('INTERACT')]
        ]);
        await User.updateOne({_id: req.userId}, {$set: {keybinds: newKeybinds}});
        res.status(200).send();

    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateToggles = async (req: Request, res: Response) => {
    try {
        const {privateProfile, toggleChat, toggleParty} = req.body;
        await User.updateOne({_id: req.userId}, {$set: {appearAsOffline: privateProfile, toggleChat: toggleChat, toggleParty: toggleParty}});
        res.status(200).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as PlayerController from './player-controller'