import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { TrainingPlanTable } from "./trainingPlan";
import { relations } from "drizzle-orm";
import { user } from "../schema";
import { NotesTable } from "./notes";
import { DisciplineTable } from "./discipline";

export const trainingStatus = ["scheduled", "completed", "missed"] as const;
export type TrainingStatus = (typeof trainingStatus)[number];
export const trainingStatusEnum = pgEnum("training_status", trainingStatus);

export const TrainingTable = pgTable("training", {
  id,
  name: text("name").notNull(),
  description: text("description"),
  disciplineType: text("discipline")
    .references(() => DisciplineTable.discipline, { onDelete: "set null" })
    .notNull(),
  date: text("date").notNull(),
  status: trainingStatusEnum("status").default("scheduled").notNull(),
  durationTimeInMinutes: integer("duration_time_in_minutes").notNull(),
  ownerId: uuid()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  trainingPlanId: uuid()
    .references(() => TrainingPlanTable.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt,
  createdAt,
});

export const TrainingRelationships = relations(
  TrainingTable,
  ({ one, many }) => ({
    owner: one(user, {
      fields: [TrainingTable.ownerId],
      references: [user.id],
    }),
    discipline: one(DisciplineTable, {
      fields: [TrainingTable.disciplineType],
      references: [DisciplineTable.discipline],
    }),
    trainingPlan: one(TrainingPlanTable, {
      fields: [TrainingTable.id],
      references: [TrainingPlanTable.id],
    }),
    notes: many(NotesTable),
  }),
);
