import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { TrainingTable } from "./training";
import { relations } from "drizzle-orm";
import { StrengthSetTable } from "./strengthSets";

export const ExerciseTable = pgTable("exercise", {
  id,
  name: text("name").notNull(),
  image: text("image"),
  trainingId: uuid("training_id")
    .references(() => TrainingTable.id)
    .notNull(),
  createdAt,
  updatedAt,
});

export const ExerciseRelationships = relations(
  ExerciseTable,
  ({ one, many }) => ({
    training: one(TrainingTable, {
      fields: [ExerciseTable.trainingId],
      references: [TrainingTable.id],
    }),
    sets: many(StrengthSetTable),
  }),
);
