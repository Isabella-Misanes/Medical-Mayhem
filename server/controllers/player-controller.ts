import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user-model'

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
            })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    console.log("IN UPDATE")
    try {
        console.log(req.userId)
        console.log("BODY IN UPDATE: " + req.body.bio)
        const updatedUser = await User.updateOne(
            {_id: req.userId},
            {$set: {bio: req.body.bio}}
        );
        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "User cannot be updated."
                })
        }

        // TODO: Return a modified cookie if the user changes their username
        return res.status(200).send()

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as PlayerController from './player-controller'