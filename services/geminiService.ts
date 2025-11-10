import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

const getBaseSystemInstruction = (language: 'en' | 'fr') => `
You are AgriPay AI, an expert agricultural assistant for small-scale farmers. 
Your response language MUST be ${language === 'en' ? 'English' : 'French'}.
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
    
    const systemInstruction = `${getBaseSystemInstruction(language)}
Provide clear, concise, and actionable advice. 
Diagnose plant issues from images and text. Suggest treatments, and give recommendations on soil, weather, and yield prediction.`;


    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};


export const generateCropPlan = async (
  details: { crop: string; season: string; landSize: string; location: string },
  language: 'en' | 'fr'
): Promise<string> => {
   if (!API_KEY) {
    return Promise.resolve("API Key is not configured. Please set the API_KEY environment variable.");
  }
  try {
    const systemInstruction = `${getBaseSystemInstruction(language)}
You are a specialist in crop planning and scheduling.`;

    const prompt = `
      Create a detailed, week-by-week crop plan for a small-scale farmer.

      **Farmer's Input:**
      - Crop: ${details.crop}
      - Planting Season: ${details.season}
      - Land Size: ${details.landSize} hectares
      - Location: ${details.location} (provide advice tailored to this general region if possible)

      **Your Task:**
      Generate a plan covering the entire crop cycle from preparation to post-harvest.
      For each stage (e.g., "Week 1-2: Soil Preparation", "Week 3: Planting", etc.), provide a list of key tasks and advice.

      **Format:**
      Use markdown. Start each stage with a '###' heading that includes the timeframe and title (e.g., '### Week 1-2: Soil Preparation').
      Follow the heading with a bulleted list of actionable tasks for that period.
      The plan should be practical and easy to follow.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: { parts: [{text: prompt}] },
        config: {
            systemInstruction: systemInstruction,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for crop plan:", error);
    return "Sorry, I encountered an error while generating the crop plan. Please try again.";
  }
};