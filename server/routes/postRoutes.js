import { Router } from "express";
import { addPost, deletePost, downvote, getPosts, upvote } from "../controllers/postControllers.js";

const router = Router()

router.get('/get', getPosts)

router.post('/post', addPost)
router.post('/downvote', downvote)
router.post('/upvote', upvote)

router.delete('/delete', deletePost)

export default router