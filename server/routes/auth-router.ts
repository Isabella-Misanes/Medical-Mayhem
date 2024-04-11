import express from 'express'
const router = express.Router()
import { AuthController } from '../controllers/auth-controller'
import { auth } from '../auth'

router.use('/loggedIn', auth.verifyToken)
router.use('/loggedIn', auth.verifyUserExists)

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)

export default router