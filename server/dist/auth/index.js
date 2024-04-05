"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
function authManager() {
    // THIS IS MIDDLEWARE THAT RUNS WITH EVERY REQUEST TO CHECK IF THE TOKEN STILL EXISTS
    const verifyToken = (req, res, next) => {
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
                });
            }
            console.log("TYPE AFTER " + typeof (token));
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log("VERIFIED: " + verified);
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;
            next();
        }
        catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    };
    // CHECKS IF THE USER STILL EXISTS IN THE DB
    const verifyUserExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Check that the user still exists given id in token
            const loggedInUser = yield user_model_1.User.findById(req.userId);
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
                return;
            }
            // Insert data of user into request otherwise
            req.username = loggedInUser.username;
            req.email = loggedInUser.email;
            next();
        }
        catch (err) {
            return null;
        }
    });
    const signToken = (userId) => __awaiter(this, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign({
            userId: userId
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        return token;
    });
    return {
        verifyToken,
        verifyUserExists,
        signToken
    };
}
exports.auth = authManager();
//# sourceMappingURL=index.js.map