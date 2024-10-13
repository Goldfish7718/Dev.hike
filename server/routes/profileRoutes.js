import { Router } from "express";
import {
  deleteUser,
  fetchFeed,
  fetchUser,
  followUser,
  initiateProfile,
  updateUser,
} from "../controllers/profileControllers.js";

const router = Router();

router.get("/fetchUser/:method/:userId", fetchUser);
router.get("/fetchFeed/:userId", fetchFeed);
router.post("/initiate", initiateProfile);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

router.put("/follow/:userId/:followerId", followUser);

export default router;
