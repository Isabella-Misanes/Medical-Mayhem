import express from 'express'
const router = express.Router()
import { GameController } from '../controllers/game-controller'
import { auth } from '../auth';

router.post('/updateStats', GameController.updateStats)

export default router