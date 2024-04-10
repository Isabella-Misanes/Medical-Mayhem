import express from 'express'
const router = express.Router()
import { AuthController } from '../controllers/auth-controller'
import { auth } from '../auth'
import { PlayerController } from '../controllers/player-controller'

// Check if the user is logged in before fulfilling any authorized request
router.use(auth.verifyToken)

router.get('/getProfile', PlayerController.getProfile)
router.post('/updateProfile', PlayerController.updateProfile)

export default router