import { Router } from "express"
import { deleteReply, getReplies, postReply } from "../controllers/replyControllers.js"
import authenticateToken from "../middleware/verifyToken.js"

const router = Router()

router.get('/get/:postId', authenticateToken, getReplies)
router.post('/reply/:postId/:userId', authenticateToken, postReply)
router.delete('/delete/:replyId', authenticateToken, deleteReply)

export default router


