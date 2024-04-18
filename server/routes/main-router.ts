import express from 'express'
const router = express.Router()
import { auth } from '../auth'
import { PlayerController } from '../controllers/player-controller'

// Check if the user is logged in before fulfilling any authorized request
router.use(auth.verifyToken)

router.get('/getProfile', PlayerController.getProfile)
router.post('/updateProfile', PlayerController.updateProfile)
router.get('/recentPlayers', PlayerController.getRecentPlayers)
router.get('/getAvatar', PlayerController.getAvatar)
router.post('/updateAvatar', PlayerController.updateAvatar)

export default router