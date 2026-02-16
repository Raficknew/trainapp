import { relations, sql } from "drizzle-orm";
import {
  check,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "../schema";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { DisciplineTable } from "./discipline";
import { NotesTable } from "./notes";
import { TrainingPlanTable } from "./trainingPlan";

export const trainingStatus = ["scheduled", "completed", "missed"] as const;
export type TrainingStatus = (typeof trainingStatus)[number];
export const trainingStatusEnum = pgEnum("training_status", trainingStatus);

export const TrainingTable = pgTable(
  "training",
  {
    id,
    name: text("name").notNull(),
    description: text("description"),
    disciplineType: text("discipline")
      .references(() => DisciplineTable.discipline, { onDelete: "set null" })
      .notNull(),
    scheduledDate: date("scheduled_date").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    status: trainingStatusEnum("status").default("scheduled").notNull(),
    durationTimeInMinutes: integer("duration_time_in_minutes").notNull(),
    rpe: integer("rpe").notNull(),
    feeling: integer("feeling").notNull(),
    ownerId: text("owner_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    trainingPlanId: uuid("training_plan_id")
      .references(() => TrainingPlanTable.id, { onDelete: "cascade" })
      .notNull(),
    updatedAt,
    createdAt,
  },
  (table) => ({
    rpeRange: check("rpe_range", sql`${table.rpe} >= 1 AND ${table.rpe} <= 10`),
    feelingRange: check(
      "feeling_range",
      sql`${table.feeling} >= 1 AND ${table.feeling} <= 10`,
    ),
  }),
);

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
      fields: [TrainingTable.trainingPlanId],
      references: [TrainingPlanTable.id],
    }),
    notes: many(NotesTable),
  }),
);
