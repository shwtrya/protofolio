/* eslint-env node */
import { Resend } from 'resend';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char] ?? char;
  });

const parseRequestBody = (body: unknown) => {
  if (!body) return null;

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  if (typeof body === 'object') {
    return body as Record<string, unknown>;
  }

  return null;
};

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => unknown;
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res
      .status(500)
      .json({ error: 'RESEND_API_KEY belum diset di environment Vercel.' });
  }

  const body = parseRequestBody(req.body);
  if (!body) {
    return res.status(400).json({ error: 'No data provided' });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject =
    typeof body.subject === 'string' && body.subject.trim()
      ? body.subject.trim()
      : 'Pesan Baru dari Form Kontak';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Nama, email, dan pesan wajib diisi.' });
  }

  const resend = new Resend(resendApiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'shawavatritya@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: escapeHtml(subject),
      html: `
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Pesan:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Gagal mengirim email.';
    return res.status(500).json({ error: message });
  }
}
