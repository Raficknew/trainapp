import { check, integer, numeric, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { ExerciseTable } from "./exercise";
import { relations, sql } from "drizzle-orm";

export const StrengthSetTable = pgTable(
  "strength_sets",
  {
    id,
    weight: numeric("weight").notNull(),
    reps: integer("reps").notNull(),
    exerciseId: uuid("exercise_id")
      .references(() => ExerciseTable.id, { onDelete: "cascade" })
      .notNull(),
    updatedAt,
    createdAt,
  },
  (table) => ({
    positiveReps: check("positive_reps", sql`${table.reps} > 0`),
    positiveWeight: check("positive_weight", sql`${table.weight} > 0`),
  }),
);

export const StrengthSetRelationships = relations(
  StrengthSetTable,
  ({ one }) => ({
    exercise: one(ExerciseTable, {
      fields: [StrengthSetTable.exerciseId],
      references: [ExerciseTable.id],
    }),
  }),
);
