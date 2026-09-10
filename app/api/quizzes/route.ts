import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { quizzes } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getDb().select().from(quizzes).orderBy(quizzes.createdAt);
    return NextResponse.json({ quizzes: items });
  } catch (error) {
    console.error("Quiz lookup failed", error);
    return NextResponse.json({ error: "문제 목록을 불러오지 못했습니다. Neon DB 연결과 마이그레이션을 확인해주세요." }, { status: 503 });
  }
}