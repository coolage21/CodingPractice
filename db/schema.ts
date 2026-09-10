import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const quizzes = pgTable("quizzes", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  topic: text("topic").notNull(),
  difficulty: text("difficulty").notNull(),
  title: text("title").notNull(),
  context: text("context").notNull(),
  prompt: text("prompt").notNull(),
  code: text("code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  quizId: uuid("quiz_id").references(() => quizzes.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  score: integer("score"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});