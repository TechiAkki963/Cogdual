import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 10 * 60 * 1000;

type TokenPayload = {
  key: string;
  emailHash: string;
  expiresAt: number;
};

function secret() {
  const value = process.env.UPLOAD_SIGNING_SECRET;
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error('UPLOAD_SIGNING_SECRET is required in production.');
  }
  return value || 'local-development-only-secret';
}

function sign(encoded: string) {
  return createHmac('sha256', secret()).update(encoded).digest('base64url');
}

export function createSubmissionToken(key: string, hashedEmail: string) {
  const payload: TokenPayload = {
    key,
    emailHash: hashedEmail,
    expiresAt: Date.now() + TOKEN_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function verifySubmissionToken(token: string): TokenPayload | null {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as TokenPayload;
    if (!parsed.key || !parsed.emailHash || parsed.expiresAt < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}
