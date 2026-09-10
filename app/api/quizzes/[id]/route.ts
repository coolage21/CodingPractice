import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [quiz] = await getDb().select().from(quizzes).where(eq(quizzes.id, id));
    if (!quiz) return NextResponse.json({ error: "문제를 찾을 수 없습니다." }, { status: 404 });
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Quiz detail lookup failed", error);
    return NextResponse.json({ error: "문제를 불러오지 못했습니다." }, { status: 503 });
  }
}