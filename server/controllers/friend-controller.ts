import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { FriendRequest } from '../models/friend-request';

//TODO: might have to add additional middleware that check if the user still exists

export const sendFriend = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const {targetUsername} = req.body;
        if(targetUsername === '') return res.status(400).json({errorMessage: 'You must enter a username.'});
        // User enters their own username
        if(targetUsername === currentUser.username) return res.status(400).json({errorMessage: 'You cannot be friends with yourself.'});
        
        // If specified user is invalid
        const targetUser = await User.findOne({username: targetUsername});
        if(!targetUser) return res.status(400).json({errorMessage: 'User ' + targetUsername + ' not found.'});

        // If user is already friends with specified user
        if(currentUser.friendsIds.includes(targetUser._id)) return res.status(400).json({errorMessage: 'You are already friends with this user.'});

        // If user already sent a friend request to the specified user
        const friendRequestSentAlready = await FriendRequest.findOne({sender: req.userId, receiver: targetUser._id});
        if(friendRequestSentAlready) return res.status(400).json({errorMessage: 'You already sent a friend request to this user.'});
        
        // Check if target user has current user blocked or if current user has target user blocked
        if(targetUser.blockedIds.includes(currentUser._id) || currentUser.blockedIds.includes(targetUser._id))
            return res.status(400).json({errorMessage: 'Unable to send friend request to this user.'});

        // Successful friend request: New document in FriendRequest collection with sender ID and receiver ID
        const friendReq = new FriendRequest({sender: req.userId, receiver: targetUser._id})
        friendReq.save();
        res.status(200).send();
    } catch(err) {
        console.error(err);
        res.status(400).send();
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        console.log('removeFriend')
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const {targetUsername} = req.body;
        console.log(targetUsername);
        const targetUser = await User.findOne({username: targetUsername});
        if(!targetUser) return res.status(400).json({errorMessage: 'Target user not found.'});
        console.log(targetUser);
        await User.updateOne({_id: currentUser._id}, { $pull: { friendsIds: targetUser._id }});

    } catch(err) {
        console.error(err);
        res.status(400).send();
    }
}

export const viewFriends = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const friendNames : string[] = [];
        const friendOnlineStatuses : boolean[] = [];
        const friendPfps : string[] = [];
        await Promise.all(currentUser.friendsIds.map(async (friendId) => {
            const friend = await User.findById(friendId);
            if(friend) {
                friendNames.push(friend.username);
                friendOnlineStatuses.push(friend.onlineStatus);
                friendPfps.push(friend.profilePicture);
            }
        }));
        return res.status(200).json({
            friends: currentUser.friendsIds,
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