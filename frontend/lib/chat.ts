export const BOT_NAME = "Helper Bot";

export function cleanUsername(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().slice(0, 32);
  if (!name || name === BOT_NAME) return null;
  return name;
}
