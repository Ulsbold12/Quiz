import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { title, content } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a quiz generator. Based on the following article, generate exactly 5 multiple choice quiz questions.

Article title: ${title}
Article content: ${content}

Return ONLY a valid JSON array with no markdown, no explanation:
[
  {
    "question": "question text",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A. option1"
  }
]`,
  });

  const text = response.text ?? "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Failed to parse quiz" }, { status: 500 });
  }

  const quizData = JSON.parse(jsonMatch[0]) as {
    question: string;
    options: string[];
    answer: string;
  }[];

  const article = await prisma.article.create({
    data: {
      title,
      content,
      quizzes: {
        create: quizData.map((q) => ({
          question: q.question,
          options: q.options,
          answer: q.answer,
        })),
      },
    },
    include: { quizzes: true },
  });

  return NextResponse.json({ article });
}
