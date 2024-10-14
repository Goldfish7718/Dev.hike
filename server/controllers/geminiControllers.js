import clerkClient from "@clerk/clerk-sdk-node";
import Profile from "../models/profileSchema.js";
import {
  getFeedSummarizationModel,
  getProfileSummarizationModel,
  getTextEnhancingModel,
  getTimelineSummarizationModel,
} from "../utils/getModels.js";
import { useModel } from "../utils/useModel.js";
import Timeline from "../models/timelineSchema.js";
import Post from "../models/postSchema.js";
import Event from "../models/eventSchema.js";

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

export const summarizeFeed = async (req, res) => {
  try {
    const { feed } = req.body;

    const feedSummarizatonModel = getFeedSummarizationModel();
    const prompt = JSON.stringify(feed);

    let result = await useModel(feedSummarizatonModel, prompt);
    result = JSON.parse(result);

    let post;
    let event;
    let timeline;

    if (result.post_id) {
      post = await Post.findById(result.post_id);
    }

    if (result.timeline_id) {
      timeline = await Timeline.findById(result.timeline_id);
    }

    if (result.event_id) {
      event = await Event.findById(result.event_id);
    }

    result = {
      ...result,
      post,
      event,
      timeline,
    };

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
