import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { Message } from '../models/message';
import { PublicChat } from '../models/public-chat';

//TODO: might have to add additional middleware that check if the user still exists

export const getPublicMessages = async (req: Request, res: Response) => {
    console.log('get public messages');
    const publicChat = await PublicChat.find();
    if(!publicChat) return res.status(400).json({error: 'Public chat could not be retrieved.'});
    const publicMessages = publicChat[0].messages;
    const messages : {username: string, text: string, date: Date}[] = [];
    await Promise.all(publicMessages.map(async (publicMessage) => {
        const message = await Message.findOne({_id: publicMessage._id});
        if(!message) return res.status(400).json({error: 'Could not retrieve message.'});
        const user = await User.findOne({_id: message.senderId}, {username: 1})
        if(user) messages.push({username: user.username, text: message.text, date: message.sendDate});
    }))
    messages.sort((d1, d2) => d1.date.getTime() - d2.date.getTime());
    return res.status(200).json(messages);
}

export const getPartyMessages = async (req: Request, res: Response) => {
    
}

export const getPrivateMessages = async (req: Request, res: Response) => {
    
}

export const sendPublicMessage = async (req: Request, res: Response) => {
    const {message} = req.body;
    if(!message) return res.status(400).json({error: 'Message is required'});
    const msg = new Message({senderId: req.userId, text: message});
    msg.save();
    let publicChat = await PublicChat.find();
    console.log(publicChat);
    if(publicChat.length !== 1) {
        const pc = new PublicChat({messages: []});
        pc.save();
    }
    await PublicChat.updateOne({}, {$push: {messages: msg}});

    return getPublicMessages(req, res);
}

export const sendPartyMessage = async (req: Request, res: Response) => {
    const {message} = req.body;
    if(!message) return res.status(400).json({error: 'Message is required'});
    const msg = new Message({senderId: req.userId, text: message});
    msg.save();
}

export const sendPrivateMessage = async (req: Request, res: Response) => {
    const {message} = req.body;
    if(!message) return res.status(400).json({error: 'Message is required'});
    const msg = new Message({senderId: req.userId, text: message});
    msg.save();
}

export * as MessageController from './message-controller'