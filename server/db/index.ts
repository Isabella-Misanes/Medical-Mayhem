import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env')}); // ty DavidP on SO

mongoose
    .connect(process.env.URI as string)
    .then(() => {
        console.log('Successfully connected to ' + process.env.URI)
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

export const db = mongoose.connection

// Import db collections
// import { User } from '../models/user-model';

// async function userCreate(username: String, bio: String) {
//     const userDetail = {
//         username: username,
//         bio: bio,
//         email: "123@gmail.com",
//         passwordHash: "yippee",
//         keybinds: new Map<string, number>(),
//         chatVisibility: false,
//         gamesPlayed: 0,
//         gamesWon: 0,
//         highScore: 0,
//         patientsSaved: 0,
//         winPercent: 0,
//         onlineStatus: false,
//         appearAsOffline: false,
//         dateSinceOnline: new Date(),
//         dateRegistered: new Date()
//     }
//     let user = new User(userDetail);
//     await user.save();
// }

// const populate = async () => {
//     await userCreate("JareBear", "JareBear's bio :3");
//     if(db) db.close();
//     console.log('done');
// }

// populate()
//     .catch((err: Error) => {
//         console.log('ERROR: ' + err);
//         if(db) db.close();
//     });

export default db