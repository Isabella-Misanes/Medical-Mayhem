import express from 'express'
const router = express.Router()
import { AvatarController } from '../controllers/avatar-controller'

// router.use(auth.verifyToken)

router.get('/avatar/:avatar', AvatarController.loadAvatar);
router.get('/avatars', AvatarController.getAllAvatars);
router.post('/updateAvatarList', AvatarController.updateAvatarList);
router.get('/mapsearch/comments/:avatar', AvatarController.getComments);
router.post('/mapsearch/addComment', AvatarController.addComment);

export default router