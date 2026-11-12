"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Milliseconds, for offsetting items in a list. Keep it under 260. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "h1" | "h2" | "p";
};

/**
 * Flips `data-shown` the first time its top edge reaches the fold. The actual
 * movement lives in CSS: add `lift` for a short rise, or `mask` to slide lines
 * up from behind a clipped edge.
 *
 * This measures on scroll rather than using an IntersectionObserver on purpose.
 * A threshold based observer can miss a tall block during a fast flick, and an
 * element that has already scrolled past never intersects again, so anything it
 * missed would stay hidden for good.
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
        if (node.getBoundingClientRect().top >= window.innerHeight * 0.94) return;
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

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      id={id}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Display type that arrives one line at a time from behind a clipped edge.
 * Pass the lines yourself so the breaks are a typographic decision rather than
 * whatever the viewport happens to do.
 */
export function MaskedLines({
  lines,
  className,
  as = "h1",
  stagger = 90,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "p";
  stagger?: number;
}) {
  return (
    <Reveal as={as} className={className}>
      {lines.map((line, i) => (
        <MaskLine key={line} delay={i * stagger}>
          {line}
        </MaskLine>
      ))}
    </Reveal>
  );
}

function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <Reveal as="span" className="mask block">
      <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
    </Reveal>
  );
}
