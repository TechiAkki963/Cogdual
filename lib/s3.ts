import { GetObjectCommand, HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { MAX_RESUME_BYTES } from '@/lib/schemas';

function config() {
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  if (!region || !bucket) {
    throw new Error('S3 is not configured.');
  }
  return { region, bucket };
}

function client() {
  const { region } = config();
  return new S3Client({ region });
}

function safeName(fileName: string) {
  const cleaned = fileName
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(-120);
  return cleaned || 'resume.pdf';
}

export async function createResumeUpload(args: {
  fileName: string;
  fileType: string;
}) {
  const { bucket } = config();
  const date = new Date().toISOString().slice(0, 10);
  const key = `applications/${date}/${randomUUID()}-${safeName(args.fileName)}`;

  const post = await createPresignedPost(client(), {
    Bucket: bucket,
    Key: key,
    Expires: 300,
    Fields: {
      'Content-Type': args.fileType,
    },
    Conditions: [
      ['content-length-range', 1, MAX_RESUME_BYTES],
      ['eq', '$Content-Type', args.fileType],
    ],
  });

  return { key, uploadUrl: post.url, uploadFields: post.fields };
}

export async function verifyResumeObject(args: {
  key: string;
  expectedSize: number;
  expectedType: string;
}) {
  const { bucket } = config();
  const result = await client().send(
    new HeadObjectCommand({ Bucket: bucket, Key: args.key }),
  );

  return result.ContentLength === args.expectedSize && result.ContentType === args.expectedType;
}

export async function createResumeDownloadUrl(key: string) {
  const { bucket } = config();
  return getSignedUrl(client(), new GetObjectCommand({ Bucket: bucket, Key: key }), {
    expiresIn: 60 * 60 * 24 * 7,
  });
}
