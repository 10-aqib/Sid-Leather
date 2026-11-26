"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/gallery";
import { ArrowLeft, ArrowRight, Close } from "./Icons";

type Filter = "all" | GalleryCategory;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const labelOf = (c: GalleryCategory) => galleryCategories.find((x) => x.key === c)?.label ?? c;

  const open = (i: number, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) {
      dlg.close();
      lastTrigger.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter gallery">
        {([{ key: "all", label: "All" }, ...galleryCategories] as { key: Filter; label: string }[]).map((c) => {
          const count = c.key === "all" ? gallery.length : gallery.filter((g) => g.category === c.key).length;
          return (
            <button key={c.key} type="button" className="filter" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
              {c.label}
              <span className="filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">{items.length} images shown</p>

      <ul className="masonry" role="list" style={{ padding: 0, margin: 0 }}>
        {items.map((g, i) => (
          <li key={g.src} className="masonry__item">
            <button type="button" className="tile" onClick={(e) => open(i, e.currentTarget)} aria-label={`View image: ${g.caption}`}>
              <Image
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                sizes="(min-width: 1000px) 31vw, (min-width: 600px) 48vw, 100vw"
                quality={75}
              />
              <span className="tile__cap">
                <small>{labelOf(g.category)}</small>
                {g.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Image viewer"
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <>
            <div className="lightbox__bar">
              <span>
                {index! + 1} / {items.length} · {labelOf(current.category)}
              </span>
              <button type="button" className="icon-btn" onClick={close} aria-label="Close image viewer">
                <Close />
              </button>
            </div>
            <div
              className="lightbox__stage"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              {items.length > 1 && (
                <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous image">
                  <ArrowLeft />
                </button>
              )}
              <Image
                key={current.src}
                className="lightbox__img"
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                quality={80}
                style={{ maxHeight: "calc(100dvh - 190px)" }}
              />
              {items.length > 1 && (
                <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next image">
                  <ArrowRight />
                </button>
              )}
            </div>
            <p className="lightbox__cap">{current.caption}</p>
          </>
        )}
      </dialog>
    </>
  );
}
