import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { user } from "./auth";

export const CoachTable = pgTable("coach", {
  id,
  name: text("name").notNull(),
  bio: text("bio"),
  createdAt,
  updatedAt,
});

export const CoachRelations = relations(CoachTable, ({ many }) => ({
  clients: many(user),
}));
