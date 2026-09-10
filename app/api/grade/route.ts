import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI } from "@/lib/openai";

const gradeRequest = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const gradeResponse = z.object({
  score: z.number().int().min(0).max(100),
  feedback: z.string().min(1),
  betterApproach: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "유효한 JSON 요청이 필요합니다." }, { status: 400 });
  }

  const result = gradeRequest.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "question과 answer를 입력해주세요." }, { status: 400 });
  }

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: [
            "당신은 친근한 코딩 퀴즈 코치입니다.",
            "사용자의 답변을 논리적 이해도 기준으로 0~100점 평가하세요.",
            "맞는 부분을 먼저 인정하고, 부족한 부분은 구체적으로 설명하세요.",
            '반드시 JSON 객체만 반환하세요: {"score": number, "feedback": string, "betterApproach": string}',
          ].join("\n"),
        },
        {
          role: "user",
          content: `문제:\n${result.data.question}\n\n사용자 답변:\n${result.data.answer}`,
        },
      ],
    });

    const content = completion.choices[0]?.message.content;
    if (!content) {
      return NextResponse.json({ error: "AI가 비어 있는 답변을 반환했습니다." }, { status: 502 });
    }

    const graded = gradeResponse.safeParse(JSON.parse(content));
    if (!graded.success) {
      return NextResponse.json({ error: "AI 채점 결과 형식이 올바르지 않습니다." }, { status: 502 });
    }

    return NextResponse.json({ ...graded.data, mode: "ai" });
  } catch (error) {
    if (error instanceof Error && error.message === "OPENAI_API_KEY is not configured") {
      return NextResponse.json({ error: "OPENAI_API_KEY를 설정한 뒤 다시 시도해주세요." }, { status: 503 });
    }

    console.error("OpenAI grading failed", error);
    return NextResponse.json({ error: "AI 채점에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 502 });
  }
}