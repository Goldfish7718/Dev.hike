import { Router } from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
  registerEvent,
} from "../controllers/eventControllers.js";

const router = Router();

router.get("/get", getEvents);
router.post("/post/:userRef", addEvent);
router.delete("/delete/:eventId", deleteEvent);
router.post("/register/:eventId/:userId", registerEvent);

export default router;
