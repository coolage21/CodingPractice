CREATE TABLE "quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"topic" text NOT NULL,
	"difficulty" text NOT NULL,
	"title" text NOT NULL,
	"context" text NOT NULL,
	"prompt" text NOT NULL,
	"code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quizzes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD COLUMN "quiz_id" uuid;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;