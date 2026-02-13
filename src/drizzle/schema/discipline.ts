import { pgTable, text } from "drizzle-orm/pg-core";

export const DisciplineTable = pgTable("discipline", {
  discipline: text("discipline").unique().primaryKey(),
});
