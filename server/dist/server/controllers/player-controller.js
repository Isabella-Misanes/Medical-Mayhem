"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = exports.updateAvatar = exports.getAvatar = exports.getRecentPlayers = exports.updateProfile = exports.getProfile = void 0;
const user_1 = require("../models/user");
//TODO: might have to add additional middleware that check if the user still exists
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getProfile");
    try {
        console.log(req.userId);
        const existingUser = yield user_1.User.findById(req.userId);
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(400)
                .json({
                errorMessage: "User does not exist."
            });
        }
        return res
            .status(200)
            .json({
            bio: existingUser.bio,
            pfp: existingUser.profilePicture
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, bio, pfp } = req.body;
        let updatedUser;
        if (pfp) {
            updatedUser = yield user_1.User.updateOne({ _id: req.userId }, { $set: { username: username, bio: bio, profilePicture: pfp } });
        }
        else {
            updatedUser = yield user_1.User.updateOne({ _id: req.userId }, { $set: { username: username, bio: bio } });
        }
        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                errorMessage: "User cannot be updated."
            });
        }
        return res.status(200).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.updateProfile = updateProfile;
const getRecentPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.User.findById(req.userId);
        if (!currentUser)
            return res.status(400).json({ errorMessage: 'Current user not found.' });
        const recentPlayers = [];
        yield Promise.all(currentUser.recentPlayers.map((recentPlayerId) => __awaiter(void 0, void 0, void 0, function* () {
            const recentPlayer = yield user_1.User.findById(recentPlayerId);
            if (recentPlayer) {
                recentPlayers.push({
                    username: recentPlayer.username,
                    profilePicture: recentPlayer.profilePicture,
                    onlineStatus: recentPlayer.onlineStatus
                });
            }
        })));
        return res.status(200).json({ players: recentPlayers });
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.getRecentPlayers = getRecentPlayers;
const getAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAvatar");
    try {
        console.log(req.userId);
        const existingUser = yield user_1.User.findById(req.userId);
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(400)
                .json({
                errorMessage: "User does not exist."
            });
        }
        return res
            .status(200)
            .json({
            pic: existingUser.avatarSprite,
            speed: existingUser.speed,
            strength: existingUser.strength,
            defense: existingUser.defense,
            favoredMinigame: existingUser.favoredMinigame
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.getAvatar = getAvatar;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pic, speed, strength, defense, favoredMinigame } = req.body;
        let updatedUser;
        if (pic) {
            updatedUser = yield user_1.User.updateOne({ _id: req.userId }, { $set: { avatarSprite: pic, speed: speed, strength: strength, defense: defense, favoredMinigame: favoredMinigame } });
        }
        else {
            updatedUser = yield user_1.User.updateOne({ _id: req.userId }, { $set: { speed: speed, strength: strength, defense: defense, favoredMinigame: favoredMinigame } });
        }
        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                errorMessage: "User cannot be updated."
            });
        }
        return res.status(200).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.updateAvatar = updateAvatar;
exports.PlayerController = __importStar(require("./player-controller"));
//# sourceMappingURL=player-controller.js.map