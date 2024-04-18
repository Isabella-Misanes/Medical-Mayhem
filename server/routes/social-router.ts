import express from 'express'
const router = express.Router()
import { FriendController } from '../controllers/friend-controller'
import { auth } from '../auth'

// Check if the user is logged in before fulfilling any authorized request
router.use(auth.verifyToken)

router.get('/friends', FriendController.viewFriends);
router.post('/friendRequest/:username', FriendController.sendFriend);
router.post('/friend/remove/:username', FriendController.removeFriend);
router.get('/friendRequests/sent', FriendController.viewSentFriendRequests);
router.get('/friendRequests/received', FriendController.viewReceivedFriendRequests);

export default router