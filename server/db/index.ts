import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose';
import { User } from '../models/user-model';
dotenv.config();

mongoose
    .connect(process.env.DB_CONNECT as string, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .catch((e: Error) => {
        console.error('Connection error', e.message)
    })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.dropDatabase();

function userCreate(username: String, bio: String) {
    const userDetail = {
        username: username,
        bio: bio,
        email: "123@gmail.com",
        passwordHash: "yippee",
        keybinds: new Map<string, number>(),
        chatVisibility: false,
        gamesPlayed: 0,
        gamesWon: 0,
        highScore: 0,
        patientsSaved: 0,
        winPercent: 0,
        onlineStatus: false,
        appearAsOffline: false,
        dateSinceOnline: new Date(),
        dateRegistered: new Date()
    }
    let user = new User(userDetail);
    user.save();
}

const populate = async () => {
    await userCreate("JareBear", "JareBear's bio :3");
    if(db) db.close();
    console.log('done');
}

populate()
    .catch((err: Error) => {
        console.log('ERROR: ' + err);
        if(db) db.close();
    });

module.exports = db