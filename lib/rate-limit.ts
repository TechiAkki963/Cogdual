import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = hasRedis
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(8, '10 m'),
      analytics: true,
      prefix: 'cogdual:forms',
    })
  : null;

const localHits = new Map<string, { count: number; resetAt: number }>();
const LOCAL_WINDOW_MS = 10 * 60 * 1000;
const LOCAL_LIMIT = 8;

function localLimit(identifier: string) {
  const now = Date.now();
  const current = localHits.get(identifier);

  if (!current || current.resetAt <= now) {
    localHits.set(identifier, { count: 1, resetAt: now + LOCAL_WINDOW_MS });
    return { success: true, remaining: LOCAL_LIMIT - 1 };
  }

  current.count += 1;
  localHits.set(identifier, current);
  return {
    success: current.count <= LOCAL_LIMIT,
    remaining: Math.max(0, LOCAL_LIMIT - current.count),
  };
}

export async function limitRequest(identifier: string) {
  if (ratelimit) {
    const result = await ratelimit.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }

  return localLimit(identifier);
}
