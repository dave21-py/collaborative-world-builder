// 1. Import the necessary classes from the library
import { GoogleGenerativeAI } from "@google/generative-ai";

// 2. Get your API key from the Vercel environment variables
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// 3. Check if the API key exists. If not, throw an error.
if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY is not set in environment variables");
  }

// 4. Initialize the main AI service with your key
const genAI = new GoogleGenerativeAI(apiKey);

// 5. Select the specific model you want to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// 6. Create the main function that our app will use to talk to the AI
export async function generateText(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("AI generation failed:", error);
    return "Sorry, I couldn't generate a response right now.";
  }
}