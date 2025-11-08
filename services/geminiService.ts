import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

const getSystemInstruction = (language: 'en' | 'fr') => `
You are AgriPay AI, an expert agricultural assistant for small-scale farmers. 
Your response language MUST be ${language === 'en' ? 'English' : 'French'}.
Provide clear, concise, and actionable advice. 
Diagnose plant issues from images and text. Suggest treatments, and give recommendations on soil, weather, and yield prediction. 
Your tone should be helpful, encouraging, and easy to understand for a non-expert audience.
Format your responses using markdown for readability, including headings, lists, and bold text.`;

export const getAgriculturalAdvice = async (
  prompt: string,
  language: 'en' | 'fr',
  image?: { mimeType: string; data: string }
): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key is not configured. Please set the API_KEY environment variable.");
  }
  try {
    const parts: any[] = [{ text: prompt }];
    if (image) {
      parts.unshift({
        inlineData: {
          mimeType: image.mimeType,
          data: image.data,
        },
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        systemInstruction: getSystemInstruction(language),
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};