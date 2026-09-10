import { redirect } from "next/navigation";
import { quizzes } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function ScenarioEntryPage() {
  const [quiz] = await getDb().select({ id: quizzes.id }).from(quizzes).orderBy(quizzes.createdAt).limit(1);
  if (!quiz) redirect("/");
  redirect(`/quiz/${quiz.id}`);
}