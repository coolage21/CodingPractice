import { NextResponse } from "next/server";
import { z } from "zod";

const gradeRequest = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export async function POST(request: Request) {
  const result = gradeRequest.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
  }

  return NextResponse.json({
    score: 72,
    feedback: "현상은 잘 짚으셨어요. 다만 setInterval이 계속 실행되면서 상태 변경과 리렌더링이 반복된다는 점까지 설명하면 더 정확해요.",
    betterApproach: "반복 작업이 꼭 필요한지 먼저 확인하고, 필요하다면 useEffect 안에서 타이머를 설정한 뒤 cleanup 함수에서 clearInterval로 정리해보세요.",
    mode: "demo",
    question: result.data.question,
  });
}