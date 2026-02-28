import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { title, content } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Article title: ${title}\n\nContent: ${content}\n\nGenerate 5 quiz questions with 4 options each.`,
  });

  return NextResponse.json({ result: response.text });
}
