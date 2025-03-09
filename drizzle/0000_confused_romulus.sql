CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"avatar" varchar(256),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
