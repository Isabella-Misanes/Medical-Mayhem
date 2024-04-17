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
        console.log("test");
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const recentPlayers: {username: string, profilePicture: string, onlineStatus: boolean}[] = [];
        await Promise.all(currentUser.recentPlayers.map(async (recentPlayerId) => {
            const recentPlayer = await User.findById(recentPlayerId);
            if(recentPlayer) {
                console.log(recentPlayer);
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

export * as PlayerController from './player-controller'