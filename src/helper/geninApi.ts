import { GoogleGenerativeAI, HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";
import fs from 'fs';
  
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDB9aWFT--t5_oLvb9X2VaVlJAw8nh6u64';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });
  
export const googleApi = async(data:any) => {
    try {
        const result = await chatSession.sendMessage(` ${data}`);
        // console.log(result);

        // Access the generated text
        const generatedText = await result.response.text();
        // console.log(generatedText);

        return generatedText;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}
