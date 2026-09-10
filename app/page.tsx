"use client";

import { useState } from "react";

const quizzes = [
  { type: "JavaScript", title: "이벤트 버블링을 막는 코드를 작성하세요", level: "초급", time: "5분", color: "coral" },
  { type: "CSS", title: "이 레이아웃은 왜 갑자기 깨졌을까요?", level: "중급", time: "7분", color: "mint" },
  { type: "Web basic", title: "3초마다 페이지가 멈추는 이유를 설명하세요", level: "중급", time: "6분", color: "yellow" },
];
const filters = ["전체", "JavaScript", "CSS", "Web basic"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const visibleQuizzes = activeFilter === "전체" ? quizzes : quizzes.filter((quiz) => quiz.type === activeFilter);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
      <nav className="flex items-center justify-between border-b border-[var(--line)] pb-5">
        <a href="#top" className="font-mono text-sm font-bold tracking-[-0.04em]">CODE<span className="text-[var(--orange)]">WARM</span><span className="ml-1 text-[var(--orange)]">●</span></a>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)] sm:gap-8">
          <a href="#quizzes" className="hover:text-[var(--orange)]">Explore</a>
          <a href="#about" className="hover:text-[var(--orange)]">Why codewarm?</a>
          <button className="hidden border border-[var(--foreground)] px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)] sm:block">Log in</button>
        </div>
      </nav>
      <section id="top" className="grid gap-10 border-b border-[var(--line)] py-16 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:py-24">
        <div>
          <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">Daily practice for curious developers</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">정답보다<br /><span className="text-[var(--orange)]">왜</span>를 생각해요.</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[var(--ink-soft)]">코드를 읽고, 설명하고, 내 언어로 다시 생각하는 시간. 오늘의 퀴즈로 개발의 기초 체력을 키워보세요.</p>
          <a href="/quiz/scenario" className="mt-8 inline-flex items-center gap-4 bg-[var(--foreground)] px-6 py-4 text-sm font-bold text-[var(--background)] transition hover:bg-[var(--orange)]">오늘의 퀴즈 풀기 <span className="text-lg">↗</span></a>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:mb-2"><div className="absolute -right-3 -top-3 h-full w-full border border-[var(--orange)]" /><div className="relative bg-[var(--mint)] p-6 sm:p-8"><div className="mb-16 flex justify-between font-mono text-[10px] font-bold uppercase"><span>Today&apos;s prompt</span><span>01 / 03</span></div><p className="font-mono text-sm leading-7">&gt; 브라우저는<br /><span className="text-[var(--orange)]">&nbsp;&nbsp;왜</span> 다시 그릴까요?</p><div className="mt-16 flex items-end justify-between"><span className="font-mono text-5xl font-bold tracking-[-0.08em]">5:00</span><span className="text-4xl">✦</span></div></div></div>
      </section>
      <section id="quizzes" className="py-14 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">Pick your challenge</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">오늘의 문제</h2></div><div className="flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`border px-3 py-2 font-mono text-[10px] font-bold uppercase transition ${activeFilter === filter ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--line)] hover:border-[var(--foreground)]"}`}>{filter}</button>)}</div></div>
        <div className="grid gap-4 lg:grid-cols-3">{visibleQuizzes.map((quiz, index) => <button key={quiz.title} onClick={() => setSelectedQuiz(index)} className={`group min-h-64 border border-transparent p-6 text-left transition hover:-translate-y-1 hover:border-[var(--foreground)] ${quiz.color === "coral" ? "bg-[#f7b19b]" : quiz.color === "mint" ? "bg-[var(--mint)]" : "bg-[#f4d477]"} ${selectedQuiz === index ? "ring-2 ring-[var(--orange)] ring-offset-2 ring-offset-[var(--background)]" : ""}`}><div className="flex justify-between font-mono text-[10px] font-bold uppercase"><span>{quiz.type}</span><span>0{index + 1}</span></div><h3 className="mt-16 max-w-xs text-2xl font-bold leading-tight tracking-[-0.05em]">{quiz.title}</h3><div className="mt-7 flex gap-4 font-mono text-[10px] font-bold uppercase"><span>{quiz.level}</span><span>{quiz.time}</span><span className="ml-auto text-base transition group-hover:translate-x-1">↗</span></div></button>)}</div>
      </section>
      <section id="about" className="grid gap-8 border-t border-[var(--line)] py-14 sm:grid-cols-2 sm:py-20"><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)]">The Codewarm method</p><p className="max-w-xl text-2xl font-bold leading-tight tracking-[-0.04em] sm:text-3xl">AI가 대신 풀어주는 서비스가 아니에요. 답을 쓰고, 왜 그렇게 생각했는지 설명하면 AI가 사고의 빈틈을 함께 찾아줍니다.</p></section>
      <footer className="flex flex-col justify-between gap-3 border-t border-[var(--line)] py-6 font-mono text-[10px] font-bold uppercase text-[var(--ink-soft)] sm:flex-row"><span>Codewarm / beta 2026</span><span>Built for better questions</span></footer>
    </main>
  );
}