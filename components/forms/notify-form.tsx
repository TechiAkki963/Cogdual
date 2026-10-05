'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Turnstile } from '@/components/turnstile';
import { NotifyInput, notifySchema } from '@/lib/schemas';

type State = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

export function NotifyForm() {
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
  } = useForm<NotifyInput>({
    resolver: zodResolver(notifySchema),
    defaultValues: { email: '', website: '', turnstileToken: '' },
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
      setStatus({ kind: 'error', message: 'Complete the human verification check, then try again.' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Saving your email…' });
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || 'Could not save your email.');
      setStatus({ kind: 'success', message: data.message || 'You are on the interest list.' });
      reset();
      setResetKey((value) => value + 1);
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  });

  return (
    <form className="notify-form" onSubmit={submit} noValidate>
      <div className="field field--grow">
        <label htmlFor="notify-email">Work email</label>
        <input
          id="notify-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </div>
      <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
      <input type="hidden" {...register('turnstileToken')} />
      <button className="button button--ink" type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Saving…' : 'Notify me'}
      </button>
      <div className="notify-form__captcha">
        <Turnstile onToken={onToken} resetKey={resetKey} />
      </div>
      <p className={`form-status form-status--${status.kind}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
