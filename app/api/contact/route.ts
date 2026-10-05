import { sendBusinessEnquiryEmail } from '@/lib/email';
import { getClientIdentifier, jsonError } from '@/lib/request';
import { limitRequest } from '@/lib/rate-limit';
import { contactSchema } from '@/lib/schemas';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = await limitRequest(getClientIdentifier(request, 'contact'));
  if (!limited.success) {
    return jsonError('Too many enquiries from this connection. Please wait a few minutes and try again.', 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('We could not read your enquiry. Please try again.');
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Check the form and try again.');
  }

  if (parsed.data.website) {
    return Response.json({ ok: true, message: 'Thanks. We received your enquiry.' });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, request))) {
    return jsonError('Human verification failed. Refresh the check and try again.', 403);
  }

  try {
    const { error } = await sendBusinessEnquiryEmail(parsed.data);
    if (error) throw error;
    return Response.json({ ok: true, message: 'Thanks. The Cogdual team will review your enquiry.' });
  } catch (error) {
    console.error('business enquiry failed', error);
    return jsonError('We could not send the enquiry. Your message is still here; please try again.', 503);
  }
}
