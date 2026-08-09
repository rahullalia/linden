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

export function Reveal({ children, className, id, delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    observer.observe(node);
    return () => observer.disconnect();
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
