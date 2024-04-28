import { Router } from "express";
import { addPost, deletePost, downvote, getFeedPosts, getPosts, upvote } from "../controllers/postControllers.js";

const router = Router()

router.get('/get/:userId', getPosts)
router.get('/get/feed-posts', getFeedPosts)

router.post('/post/:userId', addPost)
router.post('/downvote/:postId/:userId', downvote)
router.post('/upvote/:postId/:userId', upvote)

router.delete('/delete/:postId/:userId', deletePost)

export default router