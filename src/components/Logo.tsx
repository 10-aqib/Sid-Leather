import Link from "next/link";
import { HideMark } from "./Icons";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label="SID Leather — home" onClick={onClick}>
      <HideMark className="logo__mark" />
      <span className="logo__text" aria-hidden>
        <span className="logo__name">SID</span>
        <span className="logo__sub">Leather · Karachi</span>
      </span>
    </Link>
  );
}
