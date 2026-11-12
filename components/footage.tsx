"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * The full width band of footage partway down the page. Decorative, so it stays
 * out of the accessibility tree.
 *
 * The poster frame carries every device. The footage itself is an enhancement:
 * only fetched on a wide screen, when the visitor has not asked for reduced
 * motion and is not on a metered connection. That keeps a megabyte of video off
 * phones entirely.
 */
const noSubscription = () => () => {};

function footageWanted() {
  const wide = window.matchMedia("(min-width: 768px)");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return wide.matches && !still.matches && !connection?.saveData;
}

export function Footage() {
  const ref = useRef<HTMLVideoElement>(null);
  // Checked once the browser has the page; the server always renders the poster only.
  const wanted = useSyncExternalStore(noSubscription, footageWanted, () => false);

  useEffect(() => {
    const video = ref.current;
    if (!wanted || !video) return;

    video.load();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [wanted]);

  return (
    <video
      ref={ref}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      poster="/photographs/linen-still.webp"
      className="absolute inset-0 size-full object-cover"
    >
      {wanted ? (
        <>
          <source src="/video/linen.webm" type="video/webm" />
          <source src="/video/linen.mp4" type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
