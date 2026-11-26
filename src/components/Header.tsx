"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, nav } from "@/lib/site";
import { products } from "@/lib/products";
import { Logo } from "./Logo";
import { ArrowRight, ChevronDown, Close, Mail, Menu, Phone, Plus, WhatsApp } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerProducts, setDrawerProducts] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const hoverOpened = useRef(false);
  const drawerClose = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMega(false);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(false);
      setDrawer((open) => {
        if (open) menuButton.current?.focus();
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    if (drawer) drawerClose.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer]);

  const openMega = useCallback((viaHover = false) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega((open) => {
      if (!open) hoverOpened.current = viaHover;
      return true;
    });
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  }, []);

  return (
    <>
      <header
        className={`site-header${solid ? " is-solid" : ""}${mega ? " is-open-mega" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="container site-header__inner">
          <Logo />

          <nav className="main-nav" aria-label="Main">
            <ul className="main-nav__list">
              {nav.map((item) =>
                "mega" in item ? (
                  <li key={item.href} onMouseEnter={() => openMega(true)} style={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href={item.href}
                      className="main-nav__link"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onFocus={() => openMega()}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="main-nav__link"
                      aria-expanded={mega}
                      aria-controls="mega-products"
                      aria-label={mega ? "Hide products menu" : "Show products menu"}
                      onClick={() => {
                        // A mouse that just opened the menu by hovering should not immediately close it.
                        if (hoverOpened.current) {
                          hoverOpened.current = false;
                          setMega(true);
                        } else setMega((v) => !v);
                      }}
                      style={{ paddingLeft: "0.3rem" }}
                    >
                      <ChevronDown />
                    </button>
                  </li>
                ) : (
                  <li key={item.href} onMouseEnter={scheduleClose}>
                    <Link
                      href={item.href}
                      className="main-nav__link"
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="header-actions">
            <Link href="/contact?type=quote" className="btn btn--sm header-cta">
              Request a Quote
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={drawer}
              aria-controls="mobile-drawer"
              onClick={() => setDrawer(true)}
            >
              <Menu />
            </button>
          </div>
        </div>

        <div
          id="mega-products"
          className={`mega${mega ? " is-open" : ""}`}
          onMouseEnter={() => openMega(true)}
          aria-hidden={!mega}
          inert={!mega}
        >
          <div className="container mega__inner">
            <ul className="mega__grid" role="list">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="mega-card">
                    <span className="mega-card__media">
                      <Image src={p.hero.src} alt="" fill sizes="(min-width: 1140px) 20vw, 1px" quality={70} />
                    </span>
                    <span className="mega-card__title">{p.name}</span>
                    <span className="mega-card__meta">
                      {p.types.join(" & ")} · {p.thicknessSummary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mega__aside">
              <span className="eyebrow">Collection</span>
              <p>Crust and finished leather in four types, produced to your article, finish and thickness.</p>
              <Link href="/products" className="link-arrow">
                All products <ArrowRight />
              </Link>
              <Link href="/capabilities" className="link-arrow">
                Capabilities <ArrowRight />
              </Link>
              <Link href="/contact?type=samples" className="link-arrow">
                Request samples <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-drawer"
        className={`drawer${drawer ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!drawer}
        inert={!drawer}
      >
        <div className="container drawer__top">
          <Logo onClick={() => setDrawer(false)} />
          <button ref={drawerClose} type="button" className="menu-toggle" aria-label="Close menu" onClick={() => setDrawer(false)}>
            <Close />
          </button>
        </div>
        <nav className="container drawer__nav" aria-label="Mobile">
          <ul className="drawer__list">
            {nav.map((item) =>
              "mega" in item ? (
                <li key={item.href}>
                  <button
                    type="button"
                    className="drawer__link"
                    aria-expanded={drawerProducts}
                    aria-controls="drawer-products"
                    onClick={() => setDrawerProducts((v) => !v)}
                  >
                    {item.label} <Plus />
                  </button>
                  <ul id="drawer-products" className="drawer__sub" hidden={!drawerProducts}>
                    <li><Link href="/products">All products</Link></li>
                    {products.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`}>{p.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="drawer__link" aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href="/contact?type=quote" className="btn btn--block mt-3">
            Request a Quote <ArrowRight />
          </Link>
        </nav>
        <div className="container drawer__foot">
          <a href={company.phone.href} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Phone width={18} height={18} /> {company.phone.display}
          </a>
          <a href={`mailto:${company.emails.sales}`} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Mail width={18} height={18} /> {company.emails.sales}
          </a>
          <a href={company.whatsapp.href()} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <WhatsApp width={18} height={18} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
