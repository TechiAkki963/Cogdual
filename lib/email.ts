import { Resend } from 'resend';
import { company } from '@/lib/data';

function resendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured.');
  return new Resend(key);
}

function sender() {
  return process.env.RESEND_FROM || 'Cogdual Careers <careers@cogdual.com>';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#039;',
      '"': '&quot;',
    };
    return map[character];
  });
}

export async function sendApplicationEmail(args: {
  name: string;
  phone: string;
  email: string;
  role: string;
  message: string;
  resumeName: string;
  resumeUrl: string;
}) {
  return resendClient().emails.send({
    from: sender(),
    to: [company.email],
    replyTo: args.email,
    subject: `New application · ${args.role} · ${args.name}`,
    html: `
      <h2>New Cogdual application</h2>
      <p><strong>Role:</strong> ${escapeHtml(args.role)}</p>
      <p><strong>Name:</strong> ${escapeHtml(args.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(args.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(args.email)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(args.message || '—').replace(/\n/g, '<br>')}</p>
      <p><a href="${args.resumeUrl}">Open ${escapeHtml(args.resumeName)}</a> <small>(private link, expires in 7 days)</small></p>
    `,
  });
}

export async function sendBusinessEnquiryEmail(args: {
  name: string;
  email: string;
  message: string;
}) {
  return resendClient().emails.send({
    from: sender(),
    to: [company.email],
    replyTo: args.email,
    subject: `Business enquiry · ${args.name}`,
    html: `
      <h2>New business enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(args.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(args.email)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(args.message).replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendNotifyEmail(email: string) {
  return resendClient().emails.send({
    from: sender(),
    to: [company.email],
    replyTo: email,
    subject: 'HRMS launch interest',
    html: `<p><strong>${escapeHtml(email)}</strong> asked to be notified when Cogdual's HRMS and workforce platform launches.</p>`,
  });
}
