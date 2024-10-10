import { Router } from "express";
import {
  deleteUser,
  fetchFeed,
  fetchUser,
  followUser,
  initiateProfile,
  updateUser,
} from "../controllers/profileControllers.js";
import authenticateToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/fetchUser/:method/:userId", authenticateToken, fetchUser);
router.get("/fetchFeed/:userId", authenticateToken, fetchFeed);
router.post("/initiate", authenticateToken, initiateProfile);
router.put("/updateUser/:userId", authenticateToken, updateUser);
router.delete("/deleteUser/:userId", authenticateToken, deleteUser);

router.put("/follow/:userId/:followerId", authenticateToken, followUser);

export default router;
