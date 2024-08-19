import { Router } from 'express'
import { addEvent, deleteEvent, getEvents, registerEvent } from '../controllers/eventControllers.js'
import authenticateToken from '../middleware/verifyToken.js'

const router = Router()

router.get('/get', authenticateToken, getEvents)
router.post('/post/:userRef', authenticateToken, addEvent)
router.delete('/delete/:eventId', authenticateToken, deleteEvent)
router.post('/register/:eventId/:userId', authenticateToken, registerEvent)

export default router