CREATE TABLE "agent_request_nonces" (
	"agent_key_id" bigint NOT NULL,
	"nonce" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agent_request_nonces_agent_key_id_nonce_pk" PRIMARY KEY("agent_key_id","nonce")
);
--> statement-breakpoint
ALTER TABLE "agent_api_keys" ALTER COLUMN "token_prefix" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agent_api_keys" ALTER COLUMN "token_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agent_api_keys" ADD COLUMN "auth_type" text DEFAULT 'bearer' NOT NULL;--> statement-breakpoint
ALTER TABLE "agent_api_keys" ADD COLUMN "public_key_pem" text;--> statement-breakpoint
ALTER TABLE "agent_api_keys" ADD COLUMN "key_fingerprint" text;--> statement-breakpoint
ALTER TABLE "agent_request_nonces" ADD CONSTRAINT "agent_request_nonces_agent_key_id_agent_api_keys_id_fk" FOREIGN KEY ("agent_key_id") REFERENCES "public"."agent_api_keys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agent_request_nonces_created_at_idx" ON "agent_request_nonces" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "agent_api_keys_fingerprint_unique" ON "agent_api_keys" USING btree ("key_fingerprint");--> statement-breakpoint
ALTER TABLE "agent_api_keys" ADD CONSTRAINT "agent_api_keys_auth_type_valid" CHECK ("agent_api_keys"."auth_type" IN ('bearer', 'signature'));--> statement-breakpoint
ALTER TABLE "agent_api_keys" ADD CONSTRAINT "agent_api_keys_auth_material_valid" CHECK (("agent_api_keys"."auth_type" = 'bearer' AND "agent_api_keys"."token_prefix" IS NOT NULL AND "agent_api_keys"."token_hash" IS NOT NULL AND "agent_api_keys"."public_key_pem" IS NULL AND "agent_api_keys"."key_fingerprint" IS NULL) OR ("agent_api_keys"."auth_type" = 'signature' AND "agent_api_keys"."token_prefix" IS NULL AND "agent_api_keys"."token_hash" IS NULL AND "agent_api_keys"."public_key_pem" IS NOT NULL AND "agent_api_keys"."key_fingerprint" IS NOT NULL));