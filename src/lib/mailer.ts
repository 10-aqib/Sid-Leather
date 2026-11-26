import "server-only";
import nodemailer from "nodemailer";

export type Mail = { subject: string; text: string; html: string; replyTo: string };

export class MailNotConfiguredError extends Error {}

function recipients() {
  return (process.env.INQUIRY_TO || "sales@sidleather.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS));
}

/** Sends through Resend when RESEND_API_KEY is set, otherwise SMTP. Throws on any failure. */
export async function sendMail(mail: Mail): Promise<void> {
  const to = recipients();

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM || "SID Leather Website <website@sidleather.com>",
        to,
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new MailNotConfiguredError("No mail transport configured");

  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transport.sendMail({
    from: process.env.INQUIRY_FROM || `SID Leather Website <${SMTP_USER.includes("@") ? SMTP_USER : "website@sidleather.com"}>`,
    to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}
