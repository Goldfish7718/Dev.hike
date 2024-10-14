import clerkClient from "@clerk/clerk-sdk-node";
import Profile from "../models/profileSchema.js";
import {
  getProfileSummarizationModel,
  getTextEnhancingModel,
} from "../utils/getModels.js";

export const enhanceText = async (req, res) => {
  try {
    const { payload } = req.body;

    const prompt = JSON.stringify(payload);
    console.log(prompt);

    const textEnhancerModel = getTextEnhancingModel();
    let result = (await textEnhancerModel).generateContent(prompt);

    result = (await result).response;
    result = result.text();

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

    let result = (await profileSummarizerModel).generateContent(prompt);
    result = (await result).response;
    result = result.text();

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
