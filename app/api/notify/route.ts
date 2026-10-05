import { sendNotifyEmail } from '@/lib/email';
import { getClientIdentifier, jsonError } from '@/lib/request';
import { limitRequest } from '@/lib/rate-limit';
import { notifySchema } from '@/lib/schemas';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = await limitRequest(getClientIdentifier(request, 'notify'));
  if (!limited.success) {
    return jsonError('Too many requests. Please wait a few minutes and try again.', 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('We could not read your email address. Please try again.');
  }

  const parsed = notifySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Check your email address and try again.');
  }

  if (parsed.data.website) {
    return Response.json({ ok: true, message: 'You are on the interest list.' });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, request))) {
    return jsonError('Human verification failed. Refresh the check and try again.', 403);
  }

  try {
    const { error } = await sendNotifyEmail(parsed.data.email);
    if (error) throw error;
    return Response.json({ ok: true, message: 'You are on the interest list. We will notify you at launch.' });
  } catch (error) {
    console.error('notify request failed', error);
    return jsonError('We could not save your interest right now. Please try again.', 503);
  }
}
