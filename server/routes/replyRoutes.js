import { Router } from "express"
import { deleteReply, getReplies, postReply } from "../controllers/replyControllers.js"

const router = Router()

router.get('/get', getReplies)
router.post('/reply', postReply)
router.delete('/delete', deleteReply)

export default router


