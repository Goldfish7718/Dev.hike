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
