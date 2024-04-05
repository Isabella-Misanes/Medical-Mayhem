import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import { User } from '../models/user-model'
import bcrypt from 'bcrypt';

declare global {
    namespace Express {
        interface Request {
            userId: string
            username: string,
            email: string
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string
        }
    }
}

function authManager() {

    // THIS IS MIDDLEWARE THAT RUNS WITH EVERY REQUEST TO CHECK IF THE TOKEN STILL EXISTS
    const verifyToken = (req: Request, res: Response, next: NextFunction) => {
        console.log("req: " + req);
        console.log("next: " + next);
        console.log("Who called verify?");
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            console.log("TYPE AFTER " + typeof(token))

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log("VERIFIED: " + verified)
            console.log("verified.userId: " + (verified as JwtPayload).userId);
            req.userId = (verified as JwtPayload).userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    // CHECKS IF THE USER STILL EXISTS IN THE DB
    const verifyUserExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Check that the user still exists given id in token
            const loggedInUser = await User.findById(req.userId);

            // If they don't exist, invalidate their cookie and send back error message
            if (loggedInUser == null) {
                res.cookie("token", "", {
                    httpOnly: true,
                    expires: new Date(0),
                    secure: true,
                    sameSite: "none"
                }).status(404).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "?"
                }).send();
                return
            }

            // Insert data of user into request otherwise
            req.username = loggedInUser.username
            req.email = loggedInUser.email

            next()

        } catch (err) {
            return null;
        }
    }

    const signToken = async (userId: string) => {

        const token = await jwt.sign({
            userId: userId 
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return token
    }

    return {
        verifyToken,
        verifyUserExists,
        signToken
    };
}

export const auth = authManager();