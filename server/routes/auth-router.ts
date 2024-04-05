import express from 'express'
const router = express.Router()
import { AuthController } from '../controllers/auth-controller'
import { auth } from '../auth'

// NOTE: In the future, this middleware should run on all requests in the other router
// outside of authentication as well. Don't forget this!!! - Torin
router.use('/loggedIn', auth.verifyToken)
router.use('/loggedIn', auth.verifyUserExists)

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)

export default router