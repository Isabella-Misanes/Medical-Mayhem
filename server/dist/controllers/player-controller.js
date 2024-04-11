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
exports.PlayerController = exports.updateProfile = exports.getProfile = void 0;
const user_model_1 = require("../models/user-model");
//TODO: might have to add additional middleware that check if the user still exists
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getProfile");
    try {
        console.log(req.userId);
        const existingUser = yield user_model_1.User.findById(req.userId);
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
        const { bio, pfp } = req.body;
        let updatedUser;
        if (pfp) {
            console.log("HERHERHERHER");
            updatedUser = yield user_model_1.User.updateOne({ _id: req.userId }, { $set: { bio: bio, profilePicture: pfp } });
        }
        else {
            updatedUser = yield user_model_1.User.updateOne({ _id: req.userId }, { $set: { bio: bio } });
        }
        console.log("updatedUser: " + updatedUser);
        if (!updatedUser) {
            return res
                .status(400)
                .json({
                errorMessage: "User cannot be updated."
            });
        }
        // TODO: Return a modified cookie if the user changes their username
        return res.status(200).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.updateProfile = updateProfile;
exports.PlayerController = __importStar(require("./player-controller"));
//# sourceMappingURL=player-controller.js.map