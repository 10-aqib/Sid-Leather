"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide motion controller:
 *  - reveals [data-reveal] elements as they enter the viewport
 *  - applies subtle parallax to [data-parallax] images on larger screens
 * Both are skipped when the visitor prefers reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));

    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("is-visible"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      pending.forEach((el) => io!.observe(el));
    }

    // Parallax
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const wide = window.matchMedia("(min-width: 900px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const host = el.parentElement;
        if (!host) continue;
        const r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const speed = Number(el.dataset.parallax) || 0.08;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.14)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const enabled = !reduce && wide.matches && layers.length > 0;
    if (enabled) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io?.disconnect();
      if (enabled) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
