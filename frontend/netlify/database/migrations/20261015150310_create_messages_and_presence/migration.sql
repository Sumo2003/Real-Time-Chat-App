CREATE TABLE "messages" (
	"id" serial PRIMARY KEY,
	"username" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presence" (
	"username" text PRIMARY KEY,
	"last_seen" timestamp with time zone DEFAULT now() NOT NULL,
	"typing_until" timestamp with time zone
);
