CREATE TYPE "public"."submission_status" AS ENUM('staging', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('post', 'work_report', 'advisor_reply');--> statement-breakpoint
CREATE TABLE "agent_api_keys" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"token_prefix" text NOT NULL,
	"token_hash" text NOT NULL,
	"scopes" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"last_used_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"actor_type" text NOT NULL,
	"actor_id" text NOT NULL,
	"action" text NOT NULL,
	"target_type" text NOT NULL,
	"target_id" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"agent_key_id" bigint NOT NULL,
	"idempotency_key" text NOT NULL,
	"type" "submission_type" NOT NULL,
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"content_hash" text NOT NULL,
	"payload" jsonb NOT NULL,
	"validation_result" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewed_at" timestamp with time zone,
	"reviewed_by" text,
	"rejection_reason" text
);
--> statement-breakpoint
ALTER TABLE "content_submissions" ADD CONSTRAINT "content_submissions_agent_key_id_agent_api_keys_id_fk" FOREIGN KEY ("agent_key_id") REFERENCES "public"."agent_api_keys"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "agent_api_keys_token_prefix_unique" ON "agent_api_keys" USING btree ("token_prefix");--> statement-breakpoint
CREATE UNIQUE INDEX "agent_api_keys_token_hash_unique" ON "agent_api_keys" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "audit_events_target_created_idx" ON "audit_events" USING btree ("target_type","target_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "content_submissions_agent_idempotency_unique" ON "content_submissions" USING btree ("agent_key_id","idempotency_key");--> statement-breakpoint
CREATE INDEX "content_submissions_status_created_idx" ON "content_submissions" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "content_submissions_agent_created_idx" ON "content_submissions" USING btree ("agent_key_id","created_at");