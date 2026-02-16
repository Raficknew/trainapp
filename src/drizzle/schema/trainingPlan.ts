import { relations } from "drizzle-orm";
import { date, integer, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "../schema";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { TrainingTable } from "./training";

export const TrainingPlanTable = pgTable("training_plan", {
  id,
  name: text("name").notNull(),
  description: text("description"),
  durationWeeks: integer("duration_weeks").notNull(),
  startingDate: date("starting_date").notNull(),
  ownerId: text("owner_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt,
  createdAt,
});

export const TrainingPlanRelationships = relations(
  TrainingPlanTable,
  ({ one, many }) => ({
    user: one(user, {
      fields: [TrainingPlanTable.ownerId],
      references: [user.id],
    }),
    trainings: many(TrainingTable),
  }),
);
