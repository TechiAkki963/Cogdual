import { z } from 'zod';

export const acceptedResumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Enter your full name.')
  .max(80, 'Keep your name under 80 characters.');

const emailSchema = z
  .string()
  .trim()
  .email('Enter a valid email address, for example name@example.com.')
  .max(160, 'Keep your email address under 160 characters.');

const honeypotSchema = z
  .string()
  .max(0, 'Please leave this field empty.')
  .optional()
  .default('');

export const roleSchema = z.enum([
  'Node JS Developer',
  'Application Support Engineer',
  'Senior ETL Developer',
  'RUST Developer',
  'Java Full Stack Developer',
]);

const applicationBaseSchema = z.object({
  name: nameSchema,
  phone: z
    .string()
    .trim()
    .min(8, 'Enter a phone number with at least 8 digits.')
    .max(18, 'Enter a shorter phone number.')
    .regex(/^[0-9+()\-\s]+$/, 'Use only numbers and standard phone symbols.'),
  email: emailSchema,
  role: roleSchema,
  message: z
    .string()
    .trim()
    .max(1000, 'Keep your message under 1,000 characters.')
    .optional()
    .default(''),
  website: honeypotSchema,
});

export const applicationClientSchema = applicationBaseSchema.extend({
  resume: z
    .any()
    .refine((files) => files?.length === 1, 'Attach one resume file.')
    .refine((files) => {
      const file = files?.[0] as File | undefined;
      return !file || file.size <= MAX_RESUME_BYTES;
    }, 'Your resume must be 5 MB or smaller.')
    .refine((files) => {
      const file = files?.[0] as File | undefined;
      return !file || acceptedResumeTypes.includes(file.type as (typeof acceptedResumeTypes)[number]);
    }, 'Use a PDF, DOC or DOCX file.'),
});

export type ApplicationClientInput = z.infer<typeof applicationClientSchema>;

export const resumeMetadataSchema = z.object({
  key: z.string().min(12).max(512),
  name: z.string().trim().min(1).max(180),
  type: z.enum(acceptedResumeTypes),
  size: z.number().int().positive().max(MAX_RESUME_BYTES),
});

export const applicationPayloadSchema = applicationBaseSchema.extend({
  resume: resumeMetadataSchema,
  submissionToken: z.string().min(20).max(2000),
});

export type ApplicationPayload = z.infer<typeof applicationPayloadSchema>;

export const uploadIntentSchema = z.object({
  fileName: z.string().trim().min(1).max(180),
  fileType: z.enum(acceptedResumeTypes),
  fileSize: z.number().int().positive().max(MAX_RESUME_BYTES),
  email: emailSchema,
  website: honeypotSchema,
  turnstileToken: z.string().min(1, 'Complete the human verification check.'),
});

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more so we can route your enquiry.')
    .max(1500, 'Keep your message under 1,500 characters.'),
  website: honeypotSchema,
  turnstileToken: z.string().min(1, 'Complete the human verification check.'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const notifySchema = z.object({
  email: emailSchema,
  website: honeypotSchema,
  turnstileToken: z.string().min(1, 'Complete the human verification check.'),
});

export type NotifyInput = z.infer<typeof notifySchema>;
