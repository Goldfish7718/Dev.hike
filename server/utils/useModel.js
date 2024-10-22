export const useModel = async (model, prompt) => {
  let result = (await model).generateContent(prompt);

  result = (await result).response;
  result = result.text();

  return result;
};
