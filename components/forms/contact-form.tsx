'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Turnstile } from '@/components/turnstile';
import { ContactInput, contactSchema } from '@/lib/schemas';

type State = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<State>({ kind: 'idle', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const onToken = useCallback((token: string) => setTurnstileToken(token), []);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', website: '', turnstileToken: '' },
  });

  useEffect(() => {
    setValue(
      'turnstileToken',
      turnstileToken || (process.env.NODE_ENV !== 'production' ? 'dev-bypass' : ''),
      { shouldValidate: true },
    );
  }, [setValue, turnstileToken]);

  const submit = handleSubmit(async (values) => {
    const token = turnstileToken || (process.env.NODE_ENV !== 'production' ? 'dev-bypass' : '');
    if (!token) {
      setStatus({ kind: 'error', message: 'Complete the human verification check, then send your enquiry.' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Sending your enquiry…' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || 'Could not send your enquiry.');
      setStatus({ kind: 'success', message: data.message || 'Thanks. We received your enquiry.' });
      reset();
      setResetKey((value) => value + 1);
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  });

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="contact-message">How can we help?</label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us whether you are hiring, planning a campus programme, or need another HR service."
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        {errors.message && <p className="field-error">{errors.message.message}</p>}
      </div>

      <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
      <input type="hidden" {...register('turnstileToken')} />
      <Turnstile onToken={onToken} resetKey={resetKey} />

      <button className="button button--gold button--full" type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className={`form-status form-status--${status.kind}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
