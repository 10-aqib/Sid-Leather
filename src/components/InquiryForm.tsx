"use client";

import { useEffect, useId, useRef, useState } from "react";
import { company } from "@/lib/site";
import { countries } from "@/lib/countries";
import {
  LIMITS,
  PRODUCT_OPTIONS,
  TYPE_OPTIONS,
  normalise,
  validate,
  type InquiryErrors,
  type InquiryInput,
} from "@/lib/inquiry";
import { ArrowRight, Check, WhatsApp } from "./Icons";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; reference: string; email: string }
  | { state: "error"; message: string };

const FIELD_ORDER: (keyof InquiryInput)[] = ["type", "name", "company", "email", "phone", "country", "product", "quantity", "message"];

export function InquiryForm({
  defaultProduct = "",
  defaultType = "quote",
  compact = false,
}: {
  defaultProduct?: string;
  defaultType?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [type, setType] = useState(TYPE_OPTIONS.some((o) => o.value === defaultType) ? defaultType : "quote");
  const [product, setProduct] = useState(PRODUCT_OPTIONS.some((o) => o.value === defaultProduct) ? defaultProduct : "");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (TYPE_OPTIONS.some((o) => o.value === defaultType)) setType(defaultType);
  }, [defaultType]);
  useEffect(() => {
    if (PRODUCT_OPTIONS.some((o) => o.value === defaultProduct)) setProduct(defaultProduct);
  }, [defaultProduct]);

  useEffect(() => {
    if (status.state === "sent" || status.state === "error") statusRef.current?.focus();
  }, [status]);

  const clearError = (k: keyof InquiryInput) => {
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const data = normalise(raw);
    const errs = validate(data);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, hp_ref: String(raw.hp_ref ?? ""), elapsed: Date.now() - mountedAt.current }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true; reference: string }
        | { ok: false; error?: string; errors?: InquiryErrors }
        | null;

      if (res.ok && json && json.ok === true) {
        setStatus({ state: "sent", reference: json.reference, email: data.email });
        formRef.current?.reset();
        return;
      }
      if (json && json.ok === false && json.errors) setErrors(json.errors);
      setStatus({
        state: "error",
        message: (json && json.ok === false && json.error) || "We could not send your inquiry right now.",
      });
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Please check your connection and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="form-success" ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
        <span className="form-success__icon"><Check /></span>
        <h3 className="h3">Thank you — your inquiry has been sent.</h3>
        <p className="muted">
          Our sales team will reply to <strong>{status.email}</strong>. Your reference is{" "}
          <span className="ref">{status.reference}</span>.
        </p>
        <p className="muted small">
          For anything urgent, message us on{" "}
          <a className="text-link" href={company.whatsapp.href(`Hello SID Leather, following up on inquiry ${status.reference}.`)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{" "}
          or call {company.phone.display}.
        </p>
        <div>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus({ state: "idle" })}>
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof InquiryInput) =>
    errors[k] ? (
      <span className="field__error" id={id(`${k}-err`)}>
        {errors[k]}
      </span>
    ) : null;
  const a11y = (k: keyof InquiryInput) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
    onChange: () => clearError(k),
  });

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby={id("legal")}>
      <fieldset className="segmented">
        <legend className="segmented__legend">Inquiry type</legend>
        {TYPE_OPTIONS.map((o) => (
          <label key={o.value}>
            <input type="radio" name="type" value={o.value} checked={type === o.value} onChange={() => setType(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="form__row">
        <div className="field">
          <label htmlFor={id("name")}>Full name<span className="req" aria-hidden>*</span></label>
          <input {...a11y("name")} type="text" autoComplete="name" required maxLength={LIMITS.name} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={id("company")}>Company</label>
          <input {...a11y("company")} type="text" autoComplete="organization" maxLength={LIMITS.company} />
          {err("company")}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor={id("email")}>Email<span className="req" aria-hidden>*</span></label>
          <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" required maxLength={LIMITS.email} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>Phone / WhatsApp</label>
          <input {...a11y("phone")} type="tel" autoComplete="tel" maxLength={LIMITS.phone} />
          {err("phone")}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor={id("country")}>Country<span className="req" aria-hidden>*</span></label>
          <input {...a11y("country")} type="text" autoComplete="country-name" list={id("countries")} required maxLength={LIMITS.country} />
          <datalist id={id("countries")}>
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {err("country")}
        </div>
        <div className="field">
          <label htmlFor={id("product")}>Product interest<span className="req" aria-hidden>*</span></label>
          <select
            {...a11y("product")}
            required
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              clearError("product");
            }}
          >
            <option value="" disabled>Select leather</option>
            {PRODUCT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err("product")}
        </div>
      </div>

      <div className="field">
        <label htmlFor={id("quantity")}>Estimated quantity</label>
        <input {...a11y("quantity")} type="text" placeholder="e.g. 20,000 sq ft per month" maxLength={LIMITS.quantity} />
        {err("quantity")}
      </div>

      <div className="field">
        <label htmlFor={id("message")}>Message<span className="req" aria-hidden>*</span></label>
        <textarea
          {...a11y("message")}
          required
          maxLength={LIMITS.message}
          rows={compact ? 5 : 6}
          placeholder="Article, finish, thickness, colours, intended use and delivery timeline."
        />
        {err("message")}
      </div>

      <div className="hp" aria-hidden>
        <label htmlFor={id("hp_ref")}>Leave this field empty</label>
        <input id={id("hp_ref")} name="hp_ref" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
      </div>

      {status.state === "error" && (
        <div className="form-status form-status--error" role="alert" ref={statusRef} tabIndex={-1}>
          <strong>{status.message}</strong> Your message has not been sent. Please try again, or contact us directly at{" "}
          <a href={`mailto:${company.emails.sales}`}>{company.emails.sales}</a> or on{" "}
          <a href={company.whatsapp.href()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem 1.5rem" }}>
        <button type="submit" className="btn" disabled={status.state === "sending"}>
          {status.state === "sending" ? (
            <>
              <span className="spinner" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send inquiry <ArrowRight />
            </>
          )}
        </button>
        <a href={company.whatsapp.href()} target="_blank" rel="noopener noreferrer" className="link-arrow">
          <WhatsApp /> Or WhatsApp us
        </a>
      </div>
      <p className="form-legal" id={id("legal")}>
        Fields marked * are required. We use your details only to respond to your inquiry.
      </p>
      <span className="sr-only" aria-live="polite">{status.state === "sending" ? "Sending your inquiry" : ""}</span>
    </form>
  );
}
