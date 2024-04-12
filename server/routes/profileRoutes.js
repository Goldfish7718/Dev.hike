import { Router } from 'express'
import { deleteUser, fetchUser, initiateProfile, updateUser } from '../controllers/profileControllers.js'

const router = Router()

router.get('/fetchUser/:userId', fetchUser)
router.post('/initiate', initiateProfile)
router.put('/updateUser/:userId', updateUser)
router.delete('/deleteUser/:userId', deleteUser)

export default router