import express, { Response, Request } from 'express'
const router = express.Router()
import { AuthController } from '../controllers/auth-controller'

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.get('/test', async (req: Request, res: Response) => {
    res.send('hello')
})

export default router