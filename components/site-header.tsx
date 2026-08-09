"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";

import { Button } from "@/components/ui/button";
import { formatTime, nextOpenings } from "@/lib/availability";
import { practitionersFor } from "@/lib/practitioners";
import { services } from "@/lib/services";
import { hoursSummary, studio } from "@/lib/studio";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/first-visit", label: "First visit" },
  { href: "/gift-cards", label: "Gift cards" },
];

const shortDay = new Intl.DateTimeFormat("en-US", { weekday: "short" });

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ease-[var(--ease-snap)]",
        scrolled ? "border-line bg-ground/95 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="wrap flex h-[var(--rail)] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Linden, home"
          className="font-display text-[1.15rem] font-semibold uppercase leading-none tracking-[0.34em] transition-colors duration-200 hover:text-signal"
        >
          Linden
        </Link>

        <NextOpening />

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="signal" className="">
            <Link href="/book">Book</Link>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="group/menu flex h-10 items-center gap-3 pl-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:text-signal"
              >
                Menu
                <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                  <span className="h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-snap)] group-hover/menu:translate-y-[2.5px]" />
                  <span className="h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-snap)] group-hover/menu:-translate-y-[2.5px]" />
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-ground/80 backdrop-blur-sm data-[state=open]:animate-[fade-in_220ms_var(--ease-snap)]" />
              <Dialog.Content className="fixed inset-0 z-[70] overflow-y-auto bg-ground focus:outline-none data-[state=open]:animate-[fade-in_260ms_var(--ease-snap)]">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Pages on this site, plus how to reach the studio.
                </Dialog.Description>

                <div className="wrap flex h-[var(--rail)] items-center justify-between border-b border-line">
                  <span className="font-display text-[1.15rem] font-semibold uppercase leading-none tracking-[0.34em]">
                    Linden
                  </span>
                  <Dialog.Close className="flex h-10 items-center gap-3 pl-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:text-signal">
                    Close
                    <span aria-hidden className="relative block size-4">
                      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                    </span>
                  </Dialog.Close>
                </div>

                <nav aria-label="Main" className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
                  <ul>
                    {nav.map((item, i) => (
                      <li key={item.href} className="border-b border-line">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="group/link flex items-baseline gap-6 py-5 md:gap-10 md:py-7"
                          style={{ animation: `menu-in 560ms var(--ease-mech) ${i * 55}ms both` }}
                        >
                          <span className="tag w-8 shrink-0 transition-colors duration-200 group-hover/link:text-signal">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "h2 transition-[color,transform] duration-300 ease-[var(--ease-snap)]",
                              "group-hover/link:translate-x-2 group-hover/link:text-signal",
                              pathname === item.href && "text-signal",
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-14 grid gap-10 sm:grid-cols-3">
                    <div>
                      <p className="tag">Where</p>
                      <address className="mt-3 space-y-0.5 text-[0.95rem] not-italic text-bone-2">
                        <p>{studio.street}</p>
                        <p>
                          {studio.city}, {studio.state} {studio.zip}
                        </p>
                      </address>
                    </div>
                    <div>
                      <p className="tag">Hours</p>
                      <dl className="mt-3 space-y-0.5 text-[0.95rem] text-bone-2">
                        {hoursSummary.map((row) => (
                          <div key={row.label} className="flex justify-between gap-4">
                            <dt>{row.label}</dt>
                            <dd className="data text-bone">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div>
                      <p className="tag">Reach us</p>
                      <div className="mt-3 space-y-0.5 text-[0.95rem]">
                        <a
                          href={studio.phoneHref}
                          className="data block text-bone transition-colors hover:text-signal"
                        >
                          {studio.phone}
                        </a>
                        <a
                          href={`mailto:${studio.email}`}
                          className="block text-bone-2 transition-colors hover:text-signal"
                        >
                          {studio.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

/**
 * The soonest anybody is free, worked out in the browser because it depends on
 * the visitor's own clock. The row keeps its height while it is empty so
 * nothing jumps when the answer arrives.
 */
function NextOpening() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const [soonest] = nextOpenings(new Date(), 1, services, practitionersFor);
    if (!soonest) return;
    const today = new Date().toDateString() === soonest.date.toDateString();
    setLabel(
      `${today ? "Today" : shortDay.format(soonest.date)} ${formatTime(soonest.start)}`,
    );
  }, []);

  return (
    <p className="hidden h-5 items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] md:flex">
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", label ? "bg-signal" : "bg-line")}
      />
      <span className="text-bone-3">Next opening</span>
      <span className="data text-bone">{label ?? " "}</span>
    </p>
  );
}
