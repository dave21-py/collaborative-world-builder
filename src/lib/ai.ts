// 1. Import the necessary classes from the library
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- SETUP FOR TEXT GENERATION (GEMINI) ---
const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

if (!googleApiKey) {
  throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(googleApiKey);
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function generateText(prompt: string) {
  try {
    const result = await textModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("AI text generation failed:", error);
    return "Sorry, I couldn't generate a response right now.";
  }
}


// --- SETUP FOR IMAGE GENERATION (STABILITY AI) ---
const stabilityApiKey = process.env.NEXT_PUBLIC_STABILITY_API_KEY;
const stabilityApiUrl = "https://api.stability.ai/v2beta/stable-image/generate/sd3";

export async function generateImage(prompt: string) {
  if (!stabilityApiKey) {
    console.error("NEXT_PUBLIC_STABILITY_API_KEY is not set.");
    // In a real app, you might have a default placeholder image stored in your /public folder
    return null; 
  }

  const formData = new FormData();
  // We add style guidance to the prompt for better results
  formData.append('prompt', `cinematic fantasy art, high-resolution painting, ${prompt}`);
  formData.append('output_format', 'jpeg');
  formData.append('aspect_ratio', '16:9'); // Widescreen aspect ratio

  try {
    const response = await fetch(stabilityApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stabilityApiKey}`,
        'Accept': 'image/*' // We expect an image in response
      },
      body: formData,
    });

    if (!response.ok) {
      // It's helpful to log the error from the API
      const errorText = await response.text();
      throw new Error(`Stability AI request failed: ${response.status} ${errorText}`);
    }

    const imageBlob = await response.blob();
    // Create a temporary local URL for the downloaded image data
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;

  } catch (error) {
    console.error("AI image generation failed:", error);
    return null; // Return null on error
  }
}