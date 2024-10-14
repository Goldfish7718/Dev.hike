import { Router } from "express";
import { enhanceText } from "../controllers/geminiControllers.js";

const router = Router();

router.post("/enhance", enhanceText);

export default router;
