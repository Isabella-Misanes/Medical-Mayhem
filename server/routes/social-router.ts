import express from 'express'
const router = express.Router()
import { FriendController } from '../controllers/friend-controller'
import { auth } from '../auth'

// Check if the user is logged in before fulfilling any authorized request
router.use(auth.verifyToken)

router.get('/friends', FriendController.viewFriends)
// router.get('/friend', FriendController.getFriendById)

export default router