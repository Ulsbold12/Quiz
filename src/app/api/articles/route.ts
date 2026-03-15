import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    });
    return NextResponse.json({ articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ articles: [] });
  }
}
