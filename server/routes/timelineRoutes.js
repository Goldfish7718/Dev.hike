import { Router } from "express";
import {
  addToTimeline,
  deleteFromTimeline,
  getTimeline,
} from "../controllers/timelineControllers.js";

const router = Router();

router.get("/get/:userId", getTimeline);
router.post("/add/:userId", addToTimeline);
router.delete("/delete/:timelineId/:userId", deleteFromTimeline);

export default router;
