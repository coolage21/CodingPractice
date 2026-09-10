"use client";

import Link from "next/link";
import { useState } from "react";

const question = {
  category: "React / Browser basics",
  difficulty: "중급",
  title: "3초마다 페이지가 멈추는 이유를 설명하세요",
  context: "친구가 만든 카운터 페이지가 있습니다. 처음에는 잘 작동하지만, 몇 초가 지나면 브라우저가 느려지고 결국 멈춥니다.",
  code: `function Counter() {
  const [count, setCount] = useState(0);

  setInterval(() => {
    setCount(count + 1);
  }, 3000);

  return <p>{count}</p>;
}`,
};

type GradeResult = { score: number; feedback: string; betterApproach: string; mode: string };

export default function ScenarioQuizPage() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!answer.trim()) {
      setError("답변을 한두 문장이라도 적어주세요.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.title, answer }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "채점 중 문제가 발생했습니다.");
      setResult(data);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "채점 중 문제가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-6 sm:px-8 lg:px-12">
      <nav className="flex items-center justify-between border-b border-[var(--line)] pb-5">
        <Link href="/" className="font-mono text-sm font-bold tracking-[-0.04em]">CODE<span className="text-[var(--orange)]">WARM</span><span className="ml-1 text-[var(--orange)]">●</span></Link>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Scenario quiz / 01</span>
      </nav>

      <section className="py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]"><span>{question.category}</span><span className="text-[var(--ink-soft)]">/</span><span className="text-[var(--ink-soft)]">{question.difficulty}</span></div>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.06em] sm:text-6xl">{question.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{question.context}</p>
      </section>

      <section className="grid gap-6 border-y border-[var(--line)] py-8 lg:grid-cols-[.9fr_1.1fr]">
        <div><p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">The situation</p><p className="max-w-md text-lg font-bold leading-7">이 코드가 시간이 지나면서 브라우저를 느리게 만드는 이유와, 어떻게 고칠지 설명해주세요.</p></div>
        <pre className="overflow-x-auto bg-[#17211f] p-5 font-mono text-sm leading-7 text-[#f5f1e8]"><code>{question.code}</code></pre>
      </section>

      <section className="grid gap-8 py-10 lg:grid-cols-[1fr_280px] lg:items-start">
        <div><label htmlFor="answer" className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">Your explanation</label><textarea id="answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="왜 이런 현상이 생기는지, 어떻게 고칠지 자유롭게 설명해보세요." className="min-h-56 w-full resize-y border border-[var(--line)] bg-white/40 p-5 text-base leading-7 outline-none transition placeholder:text-[var(--ink-soft)] focus:border-[var(--orange)]" disabled={isSubmitting} />{error && <p className="mt-3 text-sm font-bold text-[var(--orange)]">{error}</p>}<button onClick={handleSubmit} disabled={isSubmitting} className="mt-4 w-full bg-[var(--foreground)] px-6 py-4 text-sm font-bold text-[var(--background)] transition hover:bg-[var(--orange)] disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "생각을 읽는 중..." : "답변 제출하기 ↗"}</button></div>
        <aside className="border-l-2 border-[var(--orange)] pl-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">A small hint</p><p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">컴포넌트가 렌더링될 때마다 실행되는 코드는 무엇일까요? 반복 작업을 멈출 방법도 떠올려보세요.</p></aside>
      </section>

      {result && <section className="border-t border-[var(--line)] py-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">Your understanding</p><h2 className="mt-2 text-4xl font-bold tracking-[-0.06em]">{result.score}%</h2></div><span className="font-mono text-[10px] font-bold uppercase text-[var(--ink-soft)]">{result.mode === "demo" ? "Demo feedback" : "AI feedback"}</span></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="bg-[var(--mint)] p-5"><p className="font-mono text-[10px] font-bold uppercase">What you saw</p><p className="mt-4 text-sm leading-6">{result.feedback}</p></div><div className="bg-[#f4d477] p-5"><p className="font-mono text-[10px] font-bold uppercase">Try this next</p><p className="mt-4 text-sm leading-6">{result.betterApproach}</p></div></div></section>}
    </main>
  );
}