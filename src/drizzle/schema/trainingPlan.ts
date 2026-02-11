import { user } from "../schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { TrainingTable } from "./training";

export const TrainingPlanTable = pgTable("training_plan", {
  id,
  name: text("name").notNull(),
  description: text("description"),
  durationWeeks: integer("duration_weeks").notNull(),
  startingDate: text("starting_date").notNull(),
  ownerId: uuid()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt,
  createdAt,
});

export const TrainingPlanRelationships = relations(
  TrainingPlanTable,
  ({ one, many }) => ({
    owner: one(user, {
      fields: [TrainingPlanTable.ownerId],
      references: [user.id],
    }),
    athletes: many(user),
    trainings: many(TrainingTable),
  }),
);
