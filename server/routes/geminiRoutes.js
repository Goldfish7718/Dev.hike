import { Router } from "express";
import {
  enhanceText,
  summarizeFeed,
  summarizeProfile,
  summarizeTimeline,
} from "../controllers/geminiControllers.js";

const router = Router();

router.get("/summarize-profile/:userId", summarizeProfile);
router.get("/summarize-timeline/:userId", summarizeTimeline);

router.post("/summarize-feed", summarizeFeed);
router.post("/enhance", enhanceText);

export default router;
