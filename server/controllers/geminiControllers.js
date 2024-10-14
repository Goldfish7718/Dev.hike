import { getTextEnhancingModel } from "../utils/getModels.js";

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
