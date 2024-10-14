import clerkClient from "@clerk/clerk-sdk-node";
import Profile from "../models/profileSchema.js";
import {
  getProfileSummarizationModel,
  getTextEnhancingModel,
  getTimelineSummarizationModel,
} from "../utils/getModels.js";
import { useModel } from "../utils/useModel.js";
import Timeline from "../models/timelineSchema.js";

export const enhanceText = async (req, res) => {
  try {
    const { payload } = req.body;

    const prompt = JSON.stringify(payload);
    console.log(prompt);

    const textEnhancerModel = getTextEnhancingModel();

    let result = await useModel(textEnhancerModel, prompt);

    result = JSON.parse(result);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const summarizeProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await Profile.findById(userId).lean();

    const clerkUser = await clerkClient.users.getUser(user.clerkId);

    user = {
      ...user,
      fullname: `${clerkUser.firstName} ${clerkUser.lastName}`,
    };

    const profileSummarizerModel = getProfileSummarizationModel();
    const prompt = JSON.stringify(user);

    const result = await useModel(profileSummarizerModel, prompt);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const summarizeTimeline = async (req, res) => {
  try {
    const { userId } = req.params;

    const timeline = await Timeline.find({ userRef: userId }).lean();

    const timelineSummarizerModel = getTimelineSummarizationModel();
    const prompt = JSON.stringify(timeline);

    let result = await useModel(timelineSummarizerModel, prompt);
    result = JSON.parse(result);

    const topTimelinePosts = await Timeline.find({
      _id: { $in: result.top_achievements },
    });

    result = {
      ...result,
      topTimelinePosts,
    };

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
