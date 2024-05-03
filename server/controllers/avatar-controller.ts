import { Request, Response } from 'express';
import { User } from '../models/user'
import { Avatar } from '../models/avatar';
import { Comment } from '../models/comment';

export const getAllAvatars = async (req: Request, res: Response) => {
    console.log("get all avatars");
    
    try {
        const avatars = await Avatar.find({isPublic: true});

        if(!avatars) {
            console.log("No avatars found");
            return res.status(404).json({errorMessage: 'Avatars not found.'});
        }
        else {
            console.log("Avatars found:", avatars);
            return res.status(200).json({avatars})
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const updateAvatarList = async (req: Request, res: Response) => {
    console.log("Updating Avatar list");
    try {
        const {pic, name, speed, strength, defense, favoredMinigame, isPublic} = req.body;
        const targetUser = await User.findOne({_id: req.userId});

        if(targetUser) {
            const currentAvatar = new Avatar({
                avatarSprite: pic,
                avatarName: name,
                speed: speed,
                strength: strength,
                defense: defense, 
                favoredMinigame: favoredMinigame,
                author: targetUser.username,
                comments: [],
                isPublic: isPublic,
            });
    
            const savedAvatar = await currentAvatar.save();
            console.log("New Avatar saved: " + savedAvatar);

            await User.findOneAndUpdate(
                { _id: targetUser._id },
                { $push: { avatars: currentAvatar } }
            );
            
            return res.status(200).send()
        }
        else {
            console.log("Avatar not saved");
            return res
                .status(400)
                .json({
                    errorMessage: "Avatar List cannot be updated"
                })
        }
        

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const getComments = async (req: Request, res: Response) => {
    console.log("Get comments");
    const targetAvatar = req.body;
    
    try {
        const avatar = await Avatar.findOne({_id: targetAvatar._id});

        if(!avatar) {
            console.log("No avatars found");
            return res.status(404).json({errorMessage: 'Avatar not found.'});
        }
        else {
            const comments = avatar.comments;
            return res.status(200).json({comments});
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export const addComment = async (req: Request, res: Response) => {
    console.log("Adding comment");
    try {
        const {text, targetAvatar} = req.body;
        const author = await User.findOne({_id: req.userId});

        if(author) {
            const comment = new Comment({
                senderId: author,
                text: text,
                sendDate: new Date()
            });
    
            const savedComment = await comment.save();
            console.log("New Comment saved: " + savedComment);

            await Avatar.findOneAndUpdate(
                { _id: targetAvatar._id },
                { $push: { comments: comment } }
            );
            
            return res.status(200).send()
        }
        else {
            console.log("Comment not sent.");
            return res
                .status(400)
                .json({
                    errorMessage: "Avatar Comment List cannot be updated"
                })
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as AvatarController from './avatar-controller'