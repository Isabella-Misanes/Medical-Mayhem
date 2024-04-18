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


export * as PlayerController from './player-controller'