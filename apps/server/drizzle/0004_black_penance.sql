CREATE TABLE IF NOT EXISTS "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"phone_number" text,
	"comet_id" integer,
	"team_id" integer,
	"is_comet_support" boolean DEFAULT false NOT NULL,
	"contact_role_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "people" ADD CONSTRAINT "people_contact_role_id_contact_roles_id_fk" FOREIGN KEY ("contact_role_id") REFERENCES "public"."contact_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
