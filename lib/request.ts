import { createHash } from 'crypto';

export function getClientIdentifier(request: Request, scope: string) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return `${scope}:${ip}`;
}

export function emailHash(email: string) {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}
