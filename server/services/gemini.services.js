import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
  systemInstruction:`You are a pro developer . You use best comments in your code. You never miss any kind of edge cases. You tackle errors in a very understood way`
 });

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};
