DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM "content_submissions" WHERE "agent_key_id" IS NOT NULL) THEN
		RAISE EXCEPTION 'Cannot remove legacy agent keys while content_submissions.agent_key_id still contains data';
	END IF;
	IF EXISTS (SELECT 1 FROM "content_submissions" WHERE "type"::text <> 'post') THEN
		RAISE EXCEPTION 'Cannot remove unused submission types while non-post submissions still exist';
	END IF;
	IF EXISTS (SELECT 1 FROM "content_submissions" GROUP BY "idempotency_key" HAVING count(*) > 1) THEN
		RAISE EXCEPTION 'Cannot create global idempotency constraint while duplicate keys exist';
	END IF;
END $$;--> statement-breakpoint
DROP TABLE "agent_api_keys" CASCADE;--> statement-breakpoint
DROP TABLE "agent_request_nonces" CASCADE;--> statement-breakpoint
ALTER TABLE "content_submissions" DROP CONSTRAINT "content_submissions_single_submitter";--> statement-breakpoint
ALTER TABLE "media" DROP CONSTRAINT "media_state_valid";--> statement-breakpoint
ALTER TABLE "content_submissions" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."submission_type";--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('post');--> statement-breakpoint
ALTER TABLE "content_submissions" ALTER COLUMN "type" SET DATA TYPE "public"."submission_type" USING "type"::"public"."submission_type";--> statement-breakpoint
DROP INDEX "content_submissions_agent_idempotency_unique";--> statement-breakpoint
DROP INDEX "content_submissions_agent_created_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "content_submissions_idempotency_unique" ON "content_submissions" USING btree ("idempotency_key");--> statement-breakpoint
CREATE INDEX "content_submissions_ticket_created_idx" ON "content_submissions" USING btree ("submission_ticket_id","created_at");--> statement-breakpoint
ALTER TABLE "content_submissions" DROP COLUMN "agent_key_id";--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_state_valid" CHECK ("media"."state" IN ('pending', 'committed', 'orphaned'));
