import { GoogleGenerativeAI } from "@google/generative-ai";

export const getTextEnhancingModel = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a text enhancer. You will only return the stringified JSON in the same JSON format that will be given to you. You need toe nhance the title and contect fields. Always enhance the texts keeping social media posts in context.",
  });

  return model;
};

export const getProfileSummarizationModel = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are person's profile summarizer. You will recieve a stringified JSON prompt of the person's profile details and you'll have to enhance the information in a paragraph format and return it.",
  });

  return model;
};

export const getTimelineSummarizationModel = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are persons timeline summarizer. You will recieve a stringified JSON prompt of the person's timelines of technical achievements and you'll have to enhance the information in a paragraph format and return it in the summary field. Also you will return it in a stringified JSON format with an additional field with the key top_achievements which will be an array in which you'll push maximum three IDs of what you think are their best achievements. DO NOT ATTACH JSON BACK-TICS",
  });

  return model;
};

export const getFeedSummarizationModel = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are persons social media feed summarizer. You will recieve a stringified JSON prompt of the person's feed which will contain a combination of posts and events and you'll have to enhance the information in a paragraph format and return it in the summary field. You will be returning 3 additional fields which will be post_id, timeline_id and event_id all of which will be populated by you of what you think are the best post, timeline and event. Keep the paragraph length around 150 words. DO NOT ATTACH JSON BACK-TICS AND ONLY RESPOND IN PLAIN JSON.",
  });

  return model;
};
