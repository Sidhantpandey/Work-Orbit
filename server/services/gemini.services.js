  import { GoogleGenerativeAI } from "@google/generative-ai";

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // generationConfig: { responseMimetype: "application/json" },
    systemInstruction: `You are a pro developer . You use best comments in your code. You never miss any kind of edge cases. You tackle errors in a very understood way. You have the experience of 40 yrs in development field . You make scalable applications and make no mistakes. Talk like a gentlemen and have humour level 80 percentage.`,
  });

  export const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
  };
