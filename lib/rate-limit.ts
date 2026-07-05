import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limits the waitlist server action by IP.
 *
 * Uses Upstash Redis (durable, correct across serverless instances) when
 * UPSTASH_REDIS_REST_URL/TOKEN are configured. Falls back to an in-memory
 * token bucket otherwise so local dev works with zero accounts — but that
 * fallback is NOT durable across serverless instances/cold starts and must
 * not be relied on in a real multi-instance production deployment. See
 * SETUP.md for how to provision Upstash.
 */

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const upstashLimiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "lore:waitlist",
    })
  : null;

type Bucket = { count: number; resetAt: number };
const memoryBuckets = new Map<string, Bucket>();
const MEMORY_LIMIT = 5;
const MEMORY_WINDOW_MS = 10 * 60 * 1000;

function memoryLimit(key: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + MEMORY_WINDOW_MS });
    return { success: true, remaining: MEMORY_LIMIT - 1 };
  }
  if (bucket.count >= MEMORY_LIMIT) {
    return { success: false, remaining: 0 };
  }
  bucket.count += 1;
  return { success: true, remaining: MEMORY_LIMIT - bucket.count };
}

export async function checkWaitlistRateLimit(
  identifier: string,
): Promise<{ success: boolean; remaining: number }> {
  if (upstashLimiter) {
    const { success, remaining } = await upstashLimiter.limit(identifier);
    return { success, remaining };
  }
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set — using non-durable in-memory " +
        "fallback in production. See SETUP.md to provision Upstash Redis.",
    );
  }
  return memoryLimit(identifier);
}
