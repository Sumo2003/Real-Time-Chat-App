import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial().primaryKey(),
  username: text().notNull(),
  text: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// One row per user; last_seen acts as a heartbeat for the online users list.
export const presence = pgTable("presence", {
  username: text().primaryKey(),
  lastSeen: timestamp("last_seen", { withTimezone: true }).notNull().defaultNow(),
  typingUntil: timestamp("typing_until", { withTimezone: true }),
});
