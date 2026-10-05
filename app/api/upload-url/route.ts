import { createResumeUpload } from '@/lib/s3';
import { getClientIdentifier, emailHash, jsonError } from '@/lib/request';
import { limitRequest } from '@/lib/rate-limit';
import { uploadIntentSchema } from '@/lib/schemas';
import { verifyTurnstile } from '@/lib/turnstile';
import { createSubmissionToken } from '@/lib/upload-token';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limited = await limitRequest(getClientIdentifier(request, 'resume-upload'));
  if (!limited.success) {
    return jsonError('Too many upload attempts. Please wait a few minutes and try again.', 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('We could not read the upload request. Please try again.');
  }

  const parsed = uploadIntentSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Check the resume details and try again.');
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const human = await verifyTurnstile(parsed.data.turnstileToken, request);
  if (!human) {
    return jsonError('Human verification failed. Refresh the check and try again.', 403);
  }

  try {
    const hashedEmail = emailHash(parsed.data.email);
    const upload = await createResumeUpload({
      fileName: parsed.data.fileName,
      fileType: parsed.data.fileType,
    });
    const submissionToken = createSubmissionToken(upload.key, hashedEmail);

    return Response.json({
      ok: true,
      uploadUrl: upload.uploadUrl,
      uploadFields: upload.uploadFields,
      key: upload.key,
      submissionToken,
    });
  } catch (error) {
    console.error('resume upload intent failed', error);
    return jsonError('Resume storage is temporarily unavailable. Please try again shortly.', 503);
  }
}
