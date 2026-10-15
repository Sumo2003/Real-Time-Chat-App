import type { Config } from "@netlify/functions";
import { sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { messages, presence } from "../../db/schema.js";
import { BOT_NAME, cleanUsername } from "../../lib/chat.js";

export default async (req: Request) => {
  const body = await req.json().catch(() => null);
  const user = cleanUsername(body?.user);
  const text = typeof body?.text === "string" ? body.text.trim().slice(0, 1000) : "";
  if (!user || !text) {
    return Response.json({ error: "user and text are required" }, { status: 400 });
  }

  await db.insert(messages).values({ username: user, text });
  await db.insert(messages).values({
    username: BOT_NAME,
    text: `Thanks for your message, ${user}. You said: "${text}"`,
  });
  await db
    .update(presence)
    .set({ typingUntil: null, lastSeen: sql`now()` })
    .where(sql`${presence.username} = ${user}`);

  return Response.json({ ok: true }, { status: 201 });
};

export const config: Config = {
  path: "/api/messages",
  method: "POST",
};
