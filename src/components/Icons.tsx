import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...p,
});

export const ArrowRight = (p: P) => (<svg {...base(p)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base(p)}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>);
export const ChevronDown = (p: P) => (<svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>);
export const Plus = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const Close = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Menu = (p: P) => (<svg {...base(p)}><path d="M3 7h18M3 12h18M9 17h12" /></svg>);
export const Check = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Phone = (p: P) => (<svg {...base(p)}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></svg>);
export const Mail = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></svg>);
export const Pin = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Clock = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Globe = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>);
export const Chat = (p: P) => (<svg {...base(p)}><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 10h8M8 13h5" /></svg>);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.47 9.47 0 01-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 01-1.45-5.04c0-5.22 4.25-9.47 9.48-9.47a9.4 9.4 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0012.04.63C5.76.63.65 5.74.65 12.02c0 2 .52 3.97 1.52 5.7L.55 23.62l6.03-1.58a11.37 11.37 0 005.45 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
  </svg>
);
export const Instagram = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></svg>);
export const Facebook = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.47-1.45h1.55V4.5a20 20 0 00-2.27-.12c-2.25 0-3.78 1.37-3.78 3.89V10.5H8v3h2.47V21h3.03z" /></svg>);

/* Application icons — fine line drawings */
const app = (p: P) => ({ ...base(p), viewBox: "0 0 48 48", strokeWidth: 1.4 });
export const IconFootwear = (p: P) => (<svg {...app(p)}><path d="M6 30V14h9l2 6c3 2 9 3.5 14 4.5 6 1.2 11 3 11 7.5v1H6z" /><path d="M6 33v3h36v-3" /><path d="M17 20l-3 3M20 21.5l-3 3M23.5 22.5l-3 3" /></svg>);
export const IconHandbag = (p: P) => (<svg {...app(p)}><path d="M9 18h30l-2.5 22h-25z" /><path d="M17 18v-3a7 7 0 0114 0v3" /><path d="M9 25h30" strokeDasharray="1.5 2.5" /></svg>);
export const IconGarment = (p: P) => (<svg {...app(p)}><path d="M18 7l-9 5-3 14 6 1v15h24V27l6-1-3-14-9-5" /><path d="M18 7c1 3 3 5 6 5s5-2 6-5" /><path d="M24 12v30" strokeDasharray="1.5 2.5" /></svg>);
export const IconFashion = (p: P) => (<svg {...app(p)}><path d="M24 12a3 3 0 113-3c0 2-3 2.5-3 4.5V15" /><path d="M24 15L5 31h38z" /><path d="M10 36h28" /></svg>);
export const IconGlove = (p: P) => (<svg {...app(p)}><path d="M15 42V22l-4-5a2.5 2.5 0 014-3l3 3.5V9a2 2 0 014 0v10V7a2 2 0 014 0v12V8.5a2 2 0 014 0V20v-7a2 2 0 014 0v17c0 6-3 9-7 12z" /><path d="M15 36h19" /></svg>);

/** Stretched-hide mark used in the SID Leather wordmark and favicon. */
export const HideMark = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden focusable={false} {...p}>
    <path d="M16 3c2 0 3 2 5 2s3-2 5-1c1 2-1 4 0 6s3 4 2 7-2 4-2 7 2 4 0 5-4-1-6 0-3 0-4 0-2 1-4 0-4 1-6 0 0-2 0-5-1-4-2-7 1-5 2-7-1-4 0-6c2-1 3 1 5 1s3-2 5-2z" />
    <path d="M16 7v19" strokeDasharray="1.2 2" />
  </svg>
);
