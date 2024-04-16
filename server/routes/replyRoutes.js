import { Router } from "express"
import { deleteReply, getReplies, postReply } from "../controllers/replyControllers.js"

const router = Router()

router.get('/get/:postId', getReplies)
router.post('/reply/:postId/:userId', postReply)
router.delete('/delete/:replyId', deleteReply)

export default router


