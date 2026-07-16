import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables. Please configure it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();
    const ai = getGeminiClient();
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an expert contract attorney. Help draft a custom legal clause for a micro-contract.
      
Context of the contract:
- Contract Title: ${context?.title || 'Gig Agreement'}
- Category: ${context?.category || 'General'}
- Project Scope: ${context?.scope || 'Freelance services'}
- Rate: ${context?.rate || 'Standard rate'}
- Schedule: ${context?.schedule || 'standard terms'}
- Ownership: ${context?.ownership || 'Standard transfer'}

The user wants to draft or improve a custom clause based on this prompt:
"${prompt}"

Please respond with a JSON object. The JSON must contain:
1. "title": A short, clear heading for this clause (e.g., "Non-Compete Covenant" or "Intellectual Property Ownership").
2. "clause": A professionally drafted, legally sound, but clear and understandable paragraph containing the actual clause content.
3. "briefExplanation": A 1-2 sentence layman explanation of what this clause does and why it protects the user.

Ensure the text is clean, concise, free of complex legalese, but still formal and solid. Do not include markdown formatting or backticks around the JSON in your response.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            clause: { type: Type.STRING },
            briefExplanation: { type: Type.STRING }
          },
          required: ["title", "clause", "briefExplanation"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text.trim());
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate clause using AI. Make sure GEMINI_API_KEY is set in secrets." },
      { status: 500 }
    );
  }
}
