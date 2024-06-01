CREATE TABLE IF NOT EXISTS "contact_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"team_id" integer NOT NULL,
	"contact_role_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_commissioners" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	CONSTRAINT "match_commissioners_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referees" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "referees_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_contact_role_id_contact_roles_id_fk" FOREIGN KEY ("contact_role_id") REFERENCES "public"."contact_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
