'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CloseIcon, UploadIcon } from '@/components/icons';
import { Turnstile } from '@/components/turnstile';
import { jobs } from '@/lib/data';
import {
  ApplicationClientInput,
  applicationClientSchema,
  acceptedResumeTypes,
} from '@/lib/schemas';

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

type Props = {
  open: boolean;
  initialRole: string;
  onClose: () => void;
};

export function ApplicationSheet({ open, initialRole, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicationClientInput>({
    resolver: zodResolver(applicationClientSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      role: (initialRole || jobs[0].title) as ApplicationClientInput['role'],
      message: '',
      website: '',
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (initialRole) {
      setValue('role', initialRole as ApplicationClientInput['role']);
    }
  }, [initialRole, setValue]);

  const submit = handleSubmit(async (values) => {
    const token = turnstileToken || (process.env.NODE_ENV !== 'production' ? 'dev-bypass' : '');
    if (!token) {
      setStatus({ kind: 'error', message: 'Complete the human verification check before sending.' });
      return;
    }

    const file = values.resume?.[0] as File | undefined;
    if (!file) {
      setStatus({ kind: 'error', message: 'Attach your resume, then try again.' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Securely uploading your resume…' });

    try {
      const intentResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          email: values.email,
          website: values.website,
          turnstileToken: token,
        }),
      });
      const intent = (await intentResponse.json()) as {
        message?: string;
        uploadUrl?: string;
        key?: string;
        submissionToken?: string;
        uploadFields?: Record<string, string>;
      };
      if (!intentResponse.ok || !intent.uploadUrl || !intent.uploadFields || !intent.key || !intent.submissionToken) {
        throw new Error(intent.message || 'Could not prepare the secure resume upload.');
      }

      const uploadBody = new FormData();
      Object.entries(intent.uploadFields).forEach(([key, value]) => uploadBody.append(key, value));
      uploadBody.append('file', file);

      const uploadResponse = await fetch(intent.uploadUrl, {
        method: 'POST',
        body: uploadBody,
      });
      if (!uploadResponse.ok) {
        throw new Error('The resume upload did not finish. Check your connection and try again.');
      }

      setStatus({ kind: 'sending', message: 'Resume uploaded. Sending your application…' });
      const applyResponse = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          role: values.role,
          message: values.message,
          website: values.website,
          resume: {
            key: intent.key,
            name: file.name,
            type: file.type,
            size: file.size,
          },
          submissionToken: intent.submissionToken,
        }),
      });
      const result = (await applyResponse.json()) as { message?: string };
      if (!applyResponse.ok) {
        throw new Error(result.message || 'Could not send your application.');
      }

      setStatus({ kind: 'success', message: result.message || 'Application sent.' });
      reset({
        name: '',
        phone: '',
        email: '',
        role: values.role,
        message: '',
        website: '',
        resume: undefined,
      });
      setResetKey((value) => value + 1);
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not submit your application. Your details are still here; please try again.',
      });
    }
  });

  const close = () => {
    if (status.kind === 'sending') return;
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="apply-dialog"
      aria-labelledby="apply-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="apply-sheet">
        <div className="apply-sheet__grabber" aria-hidden="true" />
        <div className="apply-sheet__header">
          <div>
            <p className="section-kicker">Quick application</p>
            <h2 id="apply-title">Apply in under a minute</h2>
          </div>
          <button className="icon-button" type="button" onClick={close} aria-label="Close application form">
            <CloseIcon />
          </button>
        </div>

        <form className="application-form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="apply-name">Full name</label>
            <input id="apply-name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="apply-phone">Phone</label>
            <input
              id="apply-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.phone)}
              {...register('phone')}
            />
            {errors.phone && <p className="field-error">{errors.phone.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="apply-email">Email</label>
            <input
              id="apply-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="apply-role">Role</label>
            <select id="apply-role" aria-invalid={Boolean(errors.role)} {...register('role')}>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </select>
            {errors.role && <p className="field-error">{errors.role.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="apply-message">Message <span className="label-optional">Optional</span></label>
            <textarea
              id="apply-message"
              rows={3}
              placeholder="Add availability, notice period, or a short note."
              aria-invalid={Boolean(errors.message)}
              {...register('message')}
            />
            {errors.message && <p className="field-error">{errors.message.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="apply-resume">Resume</label>
            <label className="file-drop" htmlFor="apply-resume">
              <UploadIcon />
              <span>
                <strong>Choose a resume</strong>
                <small>PDF, DOC or DOCX · max 5 MB</small>
              </span>
            </label>
            <input
              id="apply-resume"
              className="file-input"
              type="file"
              accept={acceptedResumeTypes.join(',') + ',.pdf,.doc,.docx'}
              aria-invalid={Boolean(errors.resume)}
              {...register('resume')}
            />
            {errors.resume && <p className="field-error">{String(errors.resume.message || '')}</p>}
          </div>

          <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
          <Turnstile onToken={onToken} resetKey={resetKey} />

          <div className="apply-sheet__sticky-action">
            <button className="button button--gold button--full" type="submit" disabled={status.kind === 'sending'}>
              {status.kind === 'sending' ? 'Sending…' : 'Send application'}
            </button>
            <p className={`form-status form-status--${status.kind}`} aria-live="polite">
              {status.message}
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}
