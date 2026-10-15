import type { Config } from "@netlify/functions";
import { sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { presence } from "../../db/schema.js";
import { cleanUsername } from "../../lib/chat.js";

export default async (req: Request) => {
  const body = await req.json().catch(() => null);
  const user = cleanUsername(body?.user);
  if (!user) return Response.json({ error: "user is required" }, { status: 400 });

  const typingUntil = body?.isTyping ? sql`now() + interval '4 seconds'` : null;
  await db
    .insert(presence)
    .values({ username: user, typingUntil })
    .onConflictDoUpdate({
      target: presence.username,
      set: { typingUntil, lastSeen: sql`now()` },
    });

  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: "/api/typing",
  method: "POST",
};
