import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const StrengthSetTable = pgTable("strength_sets", {
  id,
  weight: integer().notNull(),
  reps: integer().notNull(),
  exerciseId: uuid().notNull(),
  updatedAt,
  createdAt,
});
