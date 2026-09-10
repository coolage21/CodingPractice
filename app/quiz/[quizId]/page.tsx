import { QuizPlayer } from "@/components/quiz/QuizPlayer";

export default async function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  return <QuizPlayer quizId={quizId} />;
}