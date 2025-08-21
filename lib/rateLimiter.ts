// lib/rateLimiter.ts
const attempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now - entry.lastAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return false;
  }

  entry.count += 1;
  entry.lastAttempt = now;

  return entry.count > MAX_ATTEMPTS;
}
