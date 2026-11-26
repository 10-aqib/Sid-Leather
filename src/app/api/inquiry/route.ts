import { NextResponse, type NextRequest } from "next/server";
import { PRODUCT_OPTIONS, TYPE_OPTIONS, labelFor, normalise, validate, type InquiryInput } from "@/lib/inquiry";
import { MailNotConfiguredError, mailConfigured, sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance rate limit. Put a WAF / edge rate limit in front for stronger protection.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers: { "Cache-Control": "no-store" } });
}

function buildMail(d: InquiryInput, reference: string) {
  const type = labelFor(TYPE_OPTIONS, d.type);
  const product = labelFor(PRODUCT_OPTIONS, d.product);
  const rows: [string, string][] = [
    ["Reference", reference],
    ["Inquiry type", type],
    ["Name", d.name],
    ["Company", d.company || "—"],
    ["Email", d.email],
    ["Phone / WhatsApp", d.phone || "—"],
    ["Country", d.country],
    ["Product interest", product],
    ["Estimated quantity", d.quantity || "—"],
  ];
  const subject = `[Website] ${type} — ${product} — ${oneLine(d.company || d.name)} (${oneLine(d.country)}) · ${reference}`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}\n`;
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#211813;background:#f5f0e8;padding:24px">
<table cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#fff;border:1px solid #e2d8c8">
<tr><td style="background:#211813;color:#d4b995;padding:18px 24px;font-size:13px;letter-spacing:2px;text-transform:uppercase">SID Leather · New website inquiry</td></tr>
<tr><td style="padding:24px"><table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;color:#7a6658;width:170px;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #f0e9df">${esc(v)}</td></tr>`).join("")}
</table>
<p style="margin:24px 0 8px;color:#7a6658;font-size:12px;letter-spacing:1px;text-transform:uppercase">Message</p>
<div style="white-space:pre-wrap;font-size:15px;line-height:1.6">${esc(d.message)}</div>
<p style="margin-top:24px;font-size:12px;color:#7a6658">Reply to this email to answer ${esc(d.name)} directly.</p>
</td></tr></table></body></html>`;
  return { subject, text, html, replyTo: d.email };
}

export async function POST(req: NextRequest) {
  // Same-origin check (browsers always send Origin on cross-site POST).
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return fail(403, "This request was blocked.");
    } catch {
      return fail(403, "This request was blocked.");
    }
  }

  if (!(req.headers.get("content-type") || "").includes("application/json")) return fail(415, "Unsupported request.");
  const rawText = await req.text();
  if (rawText.length > MAX_BODY) return fail(413, "Your message is too long.");

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(rawText);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error();
  } catch {
    return fail(400, "Invalid request.");
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return fail(429, "Too many inquiries were sent from your connection. Please wait a few minutes.");

  // Honeypot: only automated submissions fill this hidden field.
  if (typeof raw.hp_ref === "string" && raw.hp_ref.trim() !== "") {
    return fail(400, "We could not send your inquiry.");
  }
  if (typeof raw.elapsed === "number" && raw.elapsed < 3000) {
    return fail(400, "That was very fast — please check your details and send again.");
  }

  const data = normalise(raw);
  const errors = validate(data);
  if (Object.keys(errors).length) return fail(422, "Please correct the highlighted fields.", { errors });

  if (!mailConfigured()) {
    console.error("[inquiry] Mail transport is not configured. Set RESEND_API_KEY or SMTP_* environment variables.");
    return fail(503, "Online inquiries are temporarily unavailable.");
  }

  const reference = `SID-${Date.now().toString(36).toUpperCase()}`;
  try {
    await sendMail(buildMail(data, reference));
  } catch (e) {
    if (e instanceof MailNotConfiguredError) return fail(503, "Online inquiries are temporarily unavailable.");
    console.error("[inquiry] send failed", e);
    return fail(502, "We could not send your inquiry right now.");
  }

  return NextResponse.json({ ok: true, reference }, { headers: { "Cache-Control": "no-store" } });
}

export function GET() {
  return fail(405, "Method not allowed.");
}
