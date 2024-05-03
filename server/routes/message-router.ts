import express from 'express';
const router = express.Router();
import { auth } from '../auth';
import { MessageController } from '../controllers/message-controller';

// Check if the user is logged in before fulfilling any authorized request
router.use(auth.verifyToken);

router.get('/messages/public/get', MessageController.getPublicMessages)
router.get('/messages/party/get', MessageController.getPartyMessages)
router.get('/messages/private/get', MessageController.getPrivateMessages)
router.post('/messages/public/send', MessageController.sendPublicMessage)
router.post('/messages/party/send', MessageController.sendPartyMessage)
router.post('/messages/private/send', MessageController.sendPrivateMessage)

export default router