import type { Config } from "@netlify/functions";
import { and, asc, desc, gt, ne, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { messages, presence } from "../../db/schema.js";
import { cleanUsername } from "../../lib/chat.js";

const ONLINE_WINDOW = sql`now() - interval '15 seconds'`;

// Polled by the browser: records a heartbeat for the user and returns
// new messages, online users and who is currently typing.
export default async (req: Request) => {
  const url = new URL(req.url);
  const user = cleanUsername(url.searchParams.get("user"));
  const after = Number(url.searchParams.get("after")) || 0;

  if (user) {
    await db
      .insert(presence)
      .values({ username: user })
      .onConflictDoUpdate({ target: presence.username, set: { lastSeen: sql`now()` } });
  }

  const newMessages =
    after > 0
      ? await db.select().from(messages).where(gt(messages.id, after)).orderBy(asc(messages.id)).limit(100)
      : (await db.select().from(messages).orderBy(desc(messages.id)).limit(50)).reverse();

  const online = await db
    .select({ username: presence.username })
    .from(presence)
    .where(gt(presence.lastSeen, ONLINE_WINDOW))
    .orderBy(asc(presence.username));

  const typing = await db
    .select({ username: presence.username })
    .from(presence)
    .where(
      and(
        gt(presence.typingUntil, sql`now()`),
        gt(presence.lastSeen, ONLINE_WINDOW),
        user ? ne(presence.username, user) : undefined,
      ),
    );

  return Response.json({
    messages: newMessages.map((m) => ({
      id: m.id,
      user: m.username,
      text: m.text,
      createdAt: m.createdAt,
    })),
    users: online.map((u) => u.username),
    typing: typing.map((t) => t.username),
  });
};

export const config: Config = {
  path: "/api/state",
  method: "GET",
};
