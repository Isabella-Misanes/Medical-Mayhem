import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// profilePicture composition taken from https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
// TODO: ADD DEFAULT VALUES TO EACH

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        bio: {type: String, required: true},
        profilePicture: 
        {
            data: Buffer,
            contentType: String
        },
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        keybinds: {type: Map, required: true},
        chatVisibility: {type: Boolean, required: true},
        friendsIds: [{ type: ObjectId, ref: 'User' }],
        blockedIds: [{type: ObjectId, ref: 'User'}],
        recentPlayers: [{type: ObjectId, ref: 'User'}],
        gamesPlayed: {type: Number, required: true},
        gamesWon : {type: Number, required: true},
        highScore : {type: Number, required: true},
        patientsSaved : {type: Number, required: true},
        winPercent : {type: Number, required: true},
        // achievements : [Achievement],
        // featuredAchievements : [Achievement],
        onlineStatus :  {type: Boolean, required: true},
        appearAsOffline :  {type: Boolean, required: true},
        dateSinceOnline :  {type: Date, required: true},
        dateRegistered :  {type: Date, required: true},
    },
    { timestamps: true },
)

export const User = mongoose.model('User', UserSchema)