"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
    username: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    keybinds: { type: Map, default: new Map([
            ['UP', 'W'],
            ['DOWN', 'S'],
            ['LEFT', 'A'],
            ['RIGHT', 'D'],
            ['INTERACT', 'E'],
        ]) },
    chatVisibility: { type: Boolean, default: true },
    friendsIds: [{ type: ObjectId, ref: 'User' }],
    blockedIds: [{ type: ObjectId, ref: 'User' }],
    recentPlayers: [{ type: ObjectId, ref: 'User' }],
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    patientsSaved: { type: Number, default: 0 },
    winPercent: { type: Number, default: 0 },
    // achievements : [Achievement],
    // featuredAchievements : [Achievement],
    onlineStatus: { type: Boolean, default: true },
    appearAsOffline: { type: Boolean, default: false },
    dateSinceOnline: { type: Date, default: new Date() },
    dateRegistered: { type: Date, default: new Date() },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user-model.js.map