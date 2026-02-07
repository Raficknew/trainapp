CREATE TABLE "strength_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"weight" integer NOT NULL,
	"reps" integer NOT NULL,
	"exerciseId" uuid NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
