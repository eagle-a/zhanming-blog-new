CREATE TABLE "submission_tickets" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"token_hash" text NOT NULL,
	"scope" text DEFAULT 'posts:submit' NOT NULL,
	"created_by" text DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	CONSTRAINT "submission_tickets_scope_valid" CHECK ("submission_tickets"."scope" = 'posts:submit'),
	CONSTRAINT "submission_tickets_expiry_after_creation" CHECK ("submission_tickets"."expires_at" > "submission_tickets"."created_at")
);
--> statement-breakpoint
ALTER TABLE "content_submissions" ALTER COLUMN "agent_key_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "content_submissions" ADD COLUMN "submission_ticket_id" bigint;--> statement-breakpoint
CREATE UNIQUE INDEX "submission_tickets_token_hash_unique" ON "submission_tickets" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "submission_tickets_created_at_idx" ON "submission_tickets" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "submission_tickets_active_expires_idx" ON "submission_tickets" USING btree ("expires_at") WHERE "submission_tickets"."used_at" IS NULL AND "submission_tickets"."revoked_at" IS NULL;--> statement-breakpoint
ALTER TABLE "content_submissions" ADD CONSTRAINT "content_submissions_submission_ticket_id_submission_tickets_id_fk" FOREIGN KEY ("submission_ticket_id") REFERENCES "public"."submission_tickets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "content_submissions_ticket_unique" ON "content_submissions" USING btree ("submission_ticket_id");--> statement-breakpoint
ALTER TABLE "content_submissions" ADD CONSTRAINT "content_submissions_single_submitter" CHECK (("content_submissions"."agent_key_id" IS NOT NULL) <> ("content_submissions"."submission_ticket_id" IS NOT NULL));