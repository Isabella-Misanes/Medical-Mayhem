import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        bio: {type: String, default: ""},
        profilePicture: {type: String, default: ""},
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        chatVisibility: {type: Boolean, default: true},
        friendsIds: [{ type: ObjectId, ref: 'User' }],
        blockedIds: [{type: ObjectId, ref: 'User'}],
        recentPlayers: [{type: ObjectId, ref: 'User'}],
        gamesPlayed: {type: Number, default: 0},
        gamesWon: {type: Number, default: 0},
        highScore: {type: Number, default: 0},
        patientsSaved: {type: Number, default: 0},
        winPercent: {type: Number, default: 0},
        // achievements : [Achievement],
        // featuredAchievements : [Achievement],
        onlineStatus: {type: Boolean, default: true},
        dateSinceOnline: {type: Date, default: new Date()},
        dateRegistered: {type: Date, default: new Date()},
        isAdmin: {type: Boolean, default: false},

        // Settings
        masterVolume: {type: Number, required: true, default: 100},
        musicVolume: {type: Number, required: true, default: 100},
        sfxVolume: {type: Number, required: true, default: 100},
        keybinds: {type: Map, default: new Map<string, string>([
            ['UP', 'W'],
            ['DOWN', 'S'],
            ['LEFT', 'A'],
            ['RIGHT', 'D'],
            ['INTERACT', 'E'],
        ])},
        appearAsOffline: {type: Boolean, default: false},
        toggleChat: {type: Boolean, default: true},
        toggleParty: {type: Boolean, default: true},

        // Pertaining to sprites and gameplay
        avatarSprite: {type: String, default: ""},
        speed: {type: Number, default: 0},
        strength: {type: Number, default: 0},
        defense: {type: Number, default: 0},
        favoredMinigame: {type: String, default: ""},
    },
    { timestamps: true },
)

export const User = mongoose.model('User', UserSchema)