import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { Message } from '../models/message';
import { PublicChat } from '../models/public-chat';

//TODO: might have to add additional middleware that check if the user still exists

export const getPublicMessages = async (req: Request, res: Response) => {

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