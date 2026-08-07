CREATE TABLE "content_document_revisions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"document_key" text NOT NULL,
	"version" bigint NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text DEFAULT 'admin' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_documents" (
	"key" text PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_documents_version_positive" CHECK ("content_documents"."version" > 0)
);
--> statement-breakpoint
ALTER TABLE "content_document_revisions" ADD CONSTRAINT "content_document_revisions_document_key_content_documents_key_fk" FOREIGN KEY ("document_key") REFERENCES "public"."content_documents"("key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "content_document_revisions_key_version_unique" ON "content_document_revisions" USING btree ("document_key","version");--> statement-breakpoint
CREATE INDEX "content_document_revisions_key_idx" ON "content_document_revisions" USING btree ("document_key");