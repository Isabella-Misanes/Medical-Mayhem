import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import { User } from '../models/user-model'

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string
        }
    }
}

function authManager() {

    // Middleware used in subsequent requests after the user is logged in
    const verify = (req: Request, res: Response, next: NextFunction) => {
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

            const verified = jwt.verify(token, process.env.JWT_SECRET)
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

    // Used when the user is getting logged in (not manually logging in)
    const verifyUser = async (req: Request) => {
        try {

            // CHANGE: now check if user exists (handling deleting users in the future)

            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            
            if (typeof decodedToken == 'string')
                return null

            const userExists = await User.findById(decodedToken.userId)

            if (!userExists)
                return null

            return decodedToken.userId;

        } catch (err) {
            return null;
        }
    }

    const signToken = async (userId: string) => {
        return jwt.sign({
            userId: userId 
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
    }

    return {
        verify,
        verifyUser,
        signToken
    };
}

export const auth = authManager();