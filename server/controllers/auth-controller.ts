import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user-model'

// Determines and returns if the user is logged in or not
export const getLoggedIn = async (req: Request, res: Response) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });

        if (loggedInUser == null) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                // TODO: add rest of user data needed back to client
                username: loggedInUser.username,
                email: loggedInUser.email
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(201)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(202)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(203)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken((existingUser._id).toString());
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                // TODO: add rest of user data needed back to client
                username: existingUser.username,
                email: existingUser.email              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        console.log('hello!')
        const { username, email, password, passwordVerify } = req.body;
        console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify);
        if (!username || !email || !password || !passwordVerify) {
            return res
                .status(204)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(201)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(202)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(203)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            // TODO: add rest of user data based on schema if any
            username, email, password
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        const token = auth.signToken((savedUser._id).toString());
        console.log("token:" + token);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                // TODO: add rest of user data needed back to client AND in auth.test.js
                username: savedUser.username,
                email: savedUser.email              
            }
        })

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as AuthController from './auth-controller'