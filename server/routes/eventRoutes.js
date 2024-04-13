import { Router } from 'express'
import { addEvent, deleteEvent, getEvents, registerEvent } from '../controllers/eventControllers.js'

const router = Router()

router.get('/get', getEvents)
router.post('/post', addEvent)
router.delete('/delete', deleteEvent)
router.post('/register', registerEvent)

export default router