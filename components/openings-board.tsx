"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { dateKey, formatTime, nextOpenings, type Opening } from "@/lib/availability";
import { practitioners, practitionersFor } from "@/lib/practitioners";
import { serviceBySlug, services } from "@/lib/services";
import { useHydrated } from "@/lib/use-hydrated";

const ROWS = 3;

const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" });

function dayLabel(date: Date) {
  return `${weekday.format(date)} ${date.getDate()}`;
}

/**
 * The next three times anybody is free. Worked out in the browser, since it
 * depends on the visitor's clock, and computed by the same function the booker
 * uses so the two can never disagree.
 *
 * Each row is a link that carries the whole choice into the booking flow, so
 * taking one of these is two taps rather than four steps. The rows keep their
 * height while empty, which is why nothing shifts when the answer lands.
 */
export function OpeningsBoard() {
  const [openings, setOpenings] = useState<Opening[] | null>(null);

  // Once, in the first render after hydration (state adjusted during render, not in an effect).
  const hydrated = useHydrated();
  if (hydrated && openings === null) {
    setOpenings(nextOpenings(new Date(), ROWS, services, practitionersFor));
  }

  return (
    <div className="border-t border-line">
      {openings === null
        ? Array.from({ length: ROWS }, (_, i) => (
            <div key={i} className="h-[4.25rem] border-b border-line md:h-[4.75rem]" />
          ))
        : openings.map((opening) => {
            const service = serviceBySlug.get(opening.serviceSlug);
            const who = practitioners.find((p) => p.id === opening.therapistId);
            const option = service?.options.findIndex((o) => o.minutes === opening.minutes) ?? 0;
            const href =
              `/book?s=${opening.serviceSlug}&o=${option}` +
              `&t=${opening.therapistId}&d=${dateKey(opening.date)}&at=${opening.start}`;

            return (
              <Link
                key={`${dateKey(opening.date)}-${opening.start}`}
                href={href}
                className="group/slot flex h-[4.25rem] items-center gap-4 border-b border-line px-1 transition-colors duration-200 ease-[var(--ease-snap)] hover:bg-ground-2 md:h-[4.75rem] md:gap-8"
              >
                <span className="data w-[5.5rem] shrink-0 text-[1.05rem] text-bone transition-colors duration-200 group-hover/slot:text-signal md:w-28 md:text-[1.35rem]">
                  {formatTime(opening.start)}
                </span>
                <span className="tag w-16 shrink-0 md:w-24">
                  {dayLabel(opening.date)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.9rem] text-bone-2 md:text-[1rem]">
                  {service?.name}
                  <span className="text-bone-3"> · {opening.minutes} min</span>
                </span>
                <span className="tag hidden shrink-0 sm:block">
                  {who?.name.split(" ")[0]}
                </span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 shrink-0 text-bone-3 transition-[transform,color] duration-200 ease-[var(--ease-snap)] group-hover/slot:translate-x-1 group-hover/slot:text-signal"
                />
              </Link>
            );
          })}
    </div>
  );
}
