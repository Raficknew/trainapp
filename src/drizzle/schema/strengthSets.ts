import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { ExerciseTable } from "./exercise";
import { relations } from "drizzle-orm";

export const StrengthSetTable = pgTable("strength_sets", {
  id,
  weight: integer("weight").notNull(),
  reps: integer("reps").notNull(),
  exerciseId: uuid("exercise_id")
    .references(() => ExerciseTable.id)
    .notNull(),
  updatedAt,
  createdAt,
});

export const StrengthSetRelationships = relations(
  StrengthSetTable,
  ({ one }) => ({
    exercise: one(ExerciseTable, {
      fields: [StrengthSetTable.exerciseId],
      references: [ExerciseTable.id],
    }),
  }),
);
