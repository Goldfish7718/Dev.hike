import { Router } from 'express'
import { addToTimeline, deleteFromTimeline, getTimeline } from '../controllers/timelineControllers.js'

const router = Router()

router.get('/get', getTimeline)
router.post('/add', addToTimeline)
router.delete('/delete', deleteFromTimeline)

export default router