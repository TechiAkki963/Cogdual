import { sendApplicationEmail } from '@/lib/email';
import { getClientIdentifier, emailHash, jsonError } from '@/lib/request';
import { limitRequest } from '@/lib/rate-limit';
import { applicationPayloadSchema } from '@/lib/schemas';
import { createResumeDownloadUrl, verifyResumeObject } from '@/lib/s3';
import { verifySubmissionToken } from '@/lib/upload-token';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = await limitRequest(getClientIdentifier(request, 'apply'));
  if (!limited.success) {
    return jsonError('Too many application attempts. Please wait a few minutes and try again.', 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('We could not read your application. Please try again.');
  }

  const parsed = applicationPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Check the form and try again.');
  }

  if (parsed.data.website) {
    return Response.json({ ok: true, message: 'Application received.' });
  }

  const hashedEmail = emailHash(parsed.data.email);
  const token = verifySubmissionToken(parsed.data.submissionToken);
  if (!token || token.key !== parsed.data.resume.key || token.emailHash !== hashedEmail) {
    return jsonError('Your secure upload session expired. Please re-attach the resume and submit again.', 403);
  }

  if (!parsed.data.resume.key.startsWith('applications/')) {
    return jsonError('Invalid resume reference.', 400);
  }

  try {
    const resumeValid = await verifyResumeObject({
      key: parsed.data.resume.key,
      expectedSize: parsed.data.resume.size,
      expectedType: parsed.data.resume.type,
    });

    if (!resumeValid) {
      return jsonError('The uploaded resume could not be verified. Please upload it again.', 400);
    }

    const resumeUrl = await createResumeDownloadUrl(parsed.data.resume.key);
    const { error } = await sendApplicationEmail({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      role: parsed.data.role,
      message: parsed.data.message,
      resumeName: parsed.data.resume.name,
      resumeUrl,
    });

    if (error) {
      console.error('application email failed', error);
      return jsonError('Your resume was saved, but we could not notify the recruitment team. Please try again.', 502);
    }

    return Response.json({
      ok: true,
      message: 'Application sent. The Cogdual recruitment team can now review your profile.',
    });
  } catch (error) {
    console.error('application submission failed', error);
    return jsonError('We could not submit your application right now. Your details are still on screen; please try again.', 503);
  }
}
