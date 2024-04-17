import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'

//TODO: might have to add additional middleware that check if the user still exists

export const sendFriend = async (req: Request, res: Response) => {
}

export const viewFriends = async (req: Request, res: Response) => {
    console.log("viewFriends");
    try {
        const existingUser = await User.findById(req.userId);
        if(!existingUser) return res.status(400).json({errorMessage: 'User does not exist.'});
        const friendNames : string[] = [];
        const friendOnlineStatuses : boolean[] = [];
        const friendPfps : string[] = [];
        await Promise.all(existingUser.friendsIds.map(async (friendId) => {
            const friend = await User.findById(friendId);
            if(friend) {
                friendNames.push(friend.username);
                friendOnlineStatuses.push(friend.onlineStatus);
                friendPfps.push(friend.profilePicture);
            }
        }));
        return res.status(200).json({
            friends: existingUser.friendsIds,
            friendNames: friendNames,
            friendOnlineStatuses: friendOnlineStatuses,
            friendPfps: friendPfps
        })
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const viewSentFriendRequests = async (req: Request, res: Response) => {
    
}

export const viewReceivedFriendRequests = async (req: Request, res: Response) => {
    
}

export const deleteFriendRequest = async (req: Request, res: Response) => {
    
}

export const acceptFriendRequest = async (req: Request, res: Response) => {
    
}

// export const getFriendById = async (req: Request, res: Response) => {
//     try {
//         const {friendId} = req.body;
//         console.log("friendId:", friendId);
//     } catch(err) {
//         console.error(err);
//         res.status(500).send();
//     }
// }

export * as FriendController from './friend-controller'