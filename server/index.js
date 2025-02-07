// MODULE IMPORTS
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTE IMPORTS
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";

// MIDDLEWARE
import authenticateToken from "./middleware/verifyToken.js";

config();

const app = express();
const PORT = 5000;

if (process.env.ORIGIN) {
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    })
  );
} else {
  app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);
app.use("/replies", replyRoutes);
app.use("/timeline", timelineRoutes);
app.use("/events", eventRoutes);
app.use("/gemini", geminiRoutes);

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

app.get('/', (req, res) => {
  res.send("Dev.hike server")
})

app.listen(PORT, async () => {
  await connectDB(process.env.DB_URI || "mongodb://0.0.0.0:27017/Devhike");
  console.log(`Server started on port ${PORT}`);
});
