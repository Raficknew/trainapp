import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { user } from "../schema";
import { TrainingTable } from "./training";
import { relations } from "drizzle-orm";

export const NotesTable = pgTable("notes", {
  id,
  content: text("content").notNull(),
  ownerId: uuid()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  trainingId: uuid()
    .references(() => TrainingTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt,
  updatedAt,
});

export const NotesRelationships = relations(NotesTable, ({ one }) => ({
  owner: one(user, {
    fields: [NotesTable.ownerId],
    references: [user.id],
  }),
  training: one(TrainingTable, {
    fields: [NotesTable.trainingId],
    references: [TrainingTable.id],
  }),
}));
