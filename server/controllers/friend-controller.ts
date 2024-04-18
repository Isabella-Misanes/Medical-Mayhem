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
        const currentUser = await User.findById(req.userId);
        if(!currentUser) return res.status(400).json({errorMessage: 'Current user not found.'});
        const {targetUsername} = req.body;
        const targetUser = await User.findOne({username: targetUsername});
        if(!targetUser) return res.status(400).json({errorMessage: 'Target user not found.'});
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
        const friends: {username: string, profilePicture: string, onlineStatus: boolean}[] = [];
        await Promise.all(currentUser.friendsIds.map(async (friendId) => {
            const friend = await User.findById(friendId);
            if(friend) {
                console.log(friend);
                friends.push({
                    username: friend.username,
                    profilePicture: friend.profilePicture,
                    onlineStatus: friend.onlineStatus
                })
            }
        }));
        return res.status(200).json({players: friends})
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const viewSentFriendRequests = async (req: Request, res: Response) => {
    try {
        console.log("test");
        const sentFriendReqs = await FriendRequest.find({sender: req.userId});
        if(!sentFriendReqs) return res.status(400).json({errorMessage: 'Current user not found.'});
        console.log(sentFriendReqs);
        const receivers: {username: string, profilePicture: string, onlineStatus: boolean}[] = [];
        await Promise.all(sentFriendReqs.map(async (friendReq) => {
            const receiver = await User.findById(friendReq.receiver);
            console.log(receiver);
            if(receiver) {
                receivers.push({
                    username: receiver.username,
                    profilePicture: receiver.profilePicture,
                    onlineStatus: receiver.onlineStatus
                })
            }
        }));
        return res.status(200).json({players: receivers})
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const viewReceivedFriendRequests = async (req: Request, res: Response) => {
    try {
        console.log("test");
        const receivedFriendReqs = await FriendRequest.find({receiver: req.userId});
        if(!receivedFriendReqs) return res.status(400).json({errorMessage: 'Current user not found.'});
        console.log(receivedFriendReqs);
        const senders: {username: string, profilePicture: string, onlineStatus: boolean}[] = [];
        await Promise.all(receivedFriendReqs.map(async (friendReq) => {
            const sender = await User.findById(friendReq.sender);
            console.log(sender);
            if(sender) {
                senders.push({
                    username: sender.username,
                    profilePicture: sender.profilePicture,
                    onlineStatus: sender.onlineStatus
                })
            }
        }));
        return res.status(200).json({players: senders})
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const deleteFriendRequest = async (req: Request, res: Response) => {
    
}

export const acceptFriendRequest = async (req: Request, res: Response) => {
    
}

export * as FriendController from './friend-controller'