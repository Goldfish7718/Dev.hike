import { Router } from "express";
import {
  addToTimeline,
  deleteFromTimeline,
  getTimeline,
} from "../controllers/timelineControllers.js";
import authenticateToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/get/:userId", authenticateToken, getTimeline);
router.post("/add/:userId", authenticateToken, addToTimeline);
router.delete(
  "/delete/:timelineId/:userId",
  authenticateToken,
  deleteFromTimeline
);

export default router;
