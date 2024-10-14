import { Router } from "express";
import {
  enhanceText,
  summarizeProfile,
  summarizeTimeline,
} from "../controllers/geminiControllers.js";

const router = Router();

router.get("/summarize-profile/:userId", summarizeProfile);
router.get("/summarize-timeline/:userId", summarizeTimeline);

router.post("/enhance", enhanceText);

export default router;
