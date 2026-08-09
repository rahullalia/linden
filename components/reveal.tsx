"use client";

import { createElement, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Milliseconds, for gently offsetting items in a list. Keep it under 200. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades its contents up the first time they reach the fold.
 *
 * This measures on scroll rather than using an IntersectionObserver on purpose.
 * A threshold based observer can miss a tall block during a fast flick, and an
 * element that has already scrolled past never intersects again, so anything it
 * missed would stay at zero opacity for good. Checking the top edge against the
 * viewport has no such gap: whatever has reached the fold is shown, and a block
 * stops listening as soon as it has.
 */
export function Reveal({ children, className, id, delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (node.getBoundingClientRect().top >= window.innerHeight * 0.92) return;
        setShown(true);
        stop();
      });
    };
    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      id,
      "data-shown": shown,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      className: cn("reveal", className),
    },
    children,
  );
}
