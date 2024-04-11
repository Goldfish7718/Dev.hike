import { Router } from 'express'
import { initiateProfile } from '../controllers/profileControllers.js'

const router = Router()

router.post('/initiate', initiateProfile)

export default router