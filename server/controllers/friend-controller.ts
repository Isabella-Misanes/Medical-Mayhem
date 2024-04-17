import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { FriendRequest } from '../models/friend-request';

//TODO: might have to add additional middleware that check if the user still exists

export const sendFriend = async (req: Request, res: Response) => {
    try {
        const existingUser = await User.findById(req.userId);
        if(!existingUser) return res.status(400).json({errorMessage: 'User does not exist.'});
        const {username} = req.body;
        if(username === '') return res.status(400).json({errorMessage: 'You must enter a username.'});
        // User enters their own username
        if(username === existingUser.username) return res.status(400).json({errorMessage: 'You cannot be friends with yourself.'});
        
        // If specified user is invalid
        const targetUser = await User.findOne({username: username});
        if(!targetUser) return res.status(400).json({errorMessage: 'User ' + username + ' not found.'});

        // If user is already friends with specified user
        if(existingUser.friendsIds.includes(targetUser._id)) return res.status(400).json({errorMessage: 'You are already friends with this user.'});

        // If user already sent a friend request to the specified user
        const friendRequestSentAlready = await FriendRequest.findOne({sender: req.userId, receiver: targetUser._id});
        if(friendRequestSentAlready) return res.status(400).json({errorMessage: 'You already sent a friend request to this user.'});
        
        // TODO: Check if target user has current user blocked
        // TODO: Check if current user has target user blocked

        // New document in FriendRequest collection with sender ID and receiver ID
        const friendReq = new FriendRequest({sender: req.userId, receiver: targetUser._id})
        friendReq.save();
        res.status(200).send();
    } catch(err) {
        console.error(err);
        res.status(400).send();
    }
}

export const viewFriends = async (req: Request, res: Response) => {
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

export * as FriendController from './friend-controller'