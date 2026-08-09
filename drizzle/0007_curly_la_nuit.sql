ALTER TABLE "media" ADD COLUMN "state" text DEFAULT 'committed' NOT NULL;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "pending_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "committed_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "last_seen_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "orphaned_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "media_state_pending_idx" ON "media" USING btree ("state","pending_at");--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_state_valid" CHECK ("media"."state" IN ('pending', 'committed'));