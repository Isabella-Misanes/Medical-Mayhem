import express from 'express'
const router = express.Router()
import { AvatarController } from '../controllers/avatar-controller'

// router.use(auth.verifyToken)

router.get('/avatars', AvatarController.getAllAvatars);
router.post('/updateAvatarList', AvatarController.updateAvatarList);
router.get('/mapsearch/comments', AvatarController.getComments);
router.post('/mapsearch/addComment', AvatarController.addComment);

export default router