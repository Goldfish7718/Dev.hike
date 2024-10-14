import { Router } from "express";
import {
  enhanceText,
  summarizeProfile,
} from "../controllers/geminiControllers.js";

const router = Router();

router.get("/summarize-profile/:userId", summarizeProfile);
router.post("/enhance", enhanceText);

export default router;
