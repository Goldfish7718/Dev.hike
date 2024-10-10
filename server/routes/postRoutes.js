import { Router } from "express";
import {
  addPost,
  deletePost,
  downvote,
  getFeedPosts,
  getPosts,
  upvote,
} from "../controllers/postControllers.js";
import authenticateToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/get/feed-posts", authenticateToken, getFeedPosts);
router.get("/get/:userId", authenticateToken, getPosts);

router.post("/post/:userId", authenticateToken, addPost);
router.post("/downvote/:postId/:userId", authenticateToken, downvote);
router.post("/upvote/:postId/:userId", authenticateToken, upvote);

router.delete("/delete/:postId/:userId", authenticateToken, deletePost);

export default router;
