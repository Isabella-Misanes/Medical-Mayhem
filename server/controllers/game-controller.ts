import { Request, Response } from 'express';
import { User } from '../models/user'

// Updates game stats of the user after the game finishes
export const updateStats = async (req: Request, res: Response) => {
    const {username, yourScore, patientsSaved} = req.body;
    try {
        const user = await User.findOne({username: username});
        if(!user) return res.status(400).json({errorMessage: 'Current user not found.'});

        user.gamesPlayed++
        user.totalScore += yourScore
        user.patientsSaved += patientsSaved
        user.highScore = yourScore > user.highScore ? yourScore : user.highScore

        await user.save()
        return res.status(200)
        
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

export * as GameController from './game-controller'