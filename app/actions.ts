"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Album } from "@/types/jazz";

// 1. Setup Key (Switch back to process.env for production security)
// If you are still debugging, you can keep the hardcoded string temporarily.
const apiKey = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey || "");

// 2. Strategy: Try the high-capacity models first.
const MODEL_CANDIDATES = [
  "gemini-pro-latest",       // Fastest, highest capacity
  "gemini-flash-latest",    // New lightweight model
  "gemini-1.5-pro",         // Smarter, but sometimes slower
  "gemini-pro"              // Legacy fallback
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getRecommendations(userTaste: string): Promise<Album[]> {
  // Safety check
  if (!apiKey) {
    console.error("API Key is missing.");
    return [];
  }

  console.log(`--- Generating recommendations for: "${userTaste}" ---`);

  // 3. Loop through models to find one that works
  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`Attempting model: ${modelName}...`);
      
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `
        You are a world-class Jazz Critic (think Nat Hentoff meets an audiophile). 
        The user is listening to: "${userTaste}".
        
        Recommend 3 jazz albums that expand their boundaries.
        
        CRITICAL INSTRUCTIONS:
        1. PERSONNEL: You MUST list the key players and their instruments.
        2. SONIC TEXTURE: The 'linerNotes' must describe the SOUND and compare it to the "${userTaste}". Is it dry? Reverb-heavy? Angular? Warm? specific timbres?
        
        OUTPUT SCHEMA (JSON Only):
        [
          {
            "id": "1",
            "artist": "Artist Name",
            "title": "Album Title",
            "year": "1999",
            "color": "#1B1B1B",
            "connection": "The Structural Pivot",
            "personnel": "Lee Morgan (tpt), Wayne Shorter (ts), Bobby Timmons (p)...",
            "linerNotes": "A description of the sonic landscape. E.g., 'The room sound is cavernous, with Shorter's tenor floating above a restless, dry rhythm section...'",
            "tracks": ["Track 1", "Track 2"]
          }
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Validate JSON
      const data = JSON.parse(text);
      
      let validData = [];
      if (Array.isArray(data)) validData = data;
      else if (data.recommendations) validData = data.recommendations;
      else if (data.albums) validData = data.albums;

      if (validData.length > 0) {
        console.log(`Success with ${modelName}!`);
        return validData;
      }

    } catch (error: any) {
      // Handle Overload (503) specifically
      if (error.message.includes("503") || error.message.includes("overloaded")) {
        console.warn(`Model ${modelName} is busy (503). Waiting 1s...`);
        await delay(1500); // Wait 1.5 seconds before trying the next model
        continue;
      }

      // Handle Not Found (404)
      if (error.message.includes("404") || error.message.includes("not found")) {
        console.warn(`Model ${modelName} not found (404). Skipping...`);
        continue;
      }
      
      console.error(`Error with ${modelName}:`, error.message);
      // Continue to next candidate anyway
    }
  }

  console.error("All models failed.");
  return [];
}