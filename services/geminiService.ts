import { GoogleGenAI } from "@google/genai";

export const getGeminiExplanation = async (stageTitle: string, userQuestion?: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "API Key not configured. Please check your environment variables.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for speed as per guidance for text tasks
    const modelId = 'gemini-2.5-flash'; 

    const prompt = userQuestion 
      ? `I am learning the Laravel Request Lifecycle. Focusing on the stage "${stageTitle}", can you answer this question: ${userQuestion}? Keep the answer concise, technical but accessible, and under 150 words. Use a cyberpunk/hacker tone if possible.`
      : `Explain the "${stageTitle}" stage of the Laravel Request Lifecycle in detail. focus on what happens under the hood. Keep it under 100 words. Use a dry, technical tone suitable for a senior engineer.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Neural link disrupted. Unable to retrieve data.";
  }
};
