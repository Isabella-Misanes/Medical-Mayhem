import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// profilePicture composition taken from https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        bio: {type: String, default: ""},
        profilePicture: 
        {
            data: Buffer,
            contentType: String
        },
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        keybinds: {type: Map, default: new Map<string, string>([
            ['UP', 'W'],
            ['DOWN', 'S'],
            ['LEFT', 'A'],
            ['RIGHT', 'D'],
            ['INTERACT', 'E'],
        ])},
        chatVisibility: {type: Boolean, default: true},
        friendsIds: [{ type: ObjectId, ref: 'User' }],
        blockedIds: [{type: ObjectId, ref: 'User'}],
        recentPlayers: [{type: ObjectId, ref: 'User'}],
        gamesPlayed: {type: Number, default: 0},
        gamesWon : {type: Number, default: 0},
        highScore : {type: Number, default: 0},
        patientsSaved : {type: Number, default: 0},
        winPercent : {type: Number, default: 0},
        // achievements : [Achievement],
        // featuredAchievements : [Achievement],
        onlineStatus :  {type: Boolean, default: true},
        appearAsOffline :  {type: Boolean, default: false},
        dateSinceOnline :  {type: Date, default: new Date()},
        dateRegistered :  {type: Date, default: new Date()},
    },
    { timestamps: true },
)

export const User = mongoose.model('User', UserSchema)