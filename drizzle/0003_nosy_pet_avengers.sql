CREATE TABLE "admin_login_attempts" (
	"key_hash" text PRIMARY KEY NOT NULL,
	"attempt_count" bigint DEFAULT 0 NOT NULL,
	"window_started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"blocked_until" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_login_attempts_count_nonnegative" CHECK ("admin_login_attempts"."attempt_count" >= 0)
);
--> statement-breakpoint
CREATE INDEX "admin_login_attempts_updated_at_idx" ON "admin_login_attempts" USING btree ("updated_at");