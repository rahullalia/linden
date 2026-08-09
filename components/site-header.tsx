"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { studio } from "@/lib/studio";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/first-visit", label: "First visit" },
  { href: "/gift-cards", label: "Gift cards" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    if (!overHero) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPast(window.scrollY > window.innerHeight * 0.7));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [overHero]);

  const onDark = overHero && !past;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-[var(--ease-standard)]",
        onDark
          ? "border-b border-transparent bg-transparent text-paper"
          : "border-b border-rule bg-paper/92 text-ink backdrop-blur-md",
      )}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label="Linden, home"
          className="font-display text-[1.45rem] leading-none tracking-[0.16em] transition-opacity duration-200 hover:opacity-70 md:text-[1.6rem]"
        >
          LINDEN
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "link py-1 text-[0.92rem]",
                pathname === item.href && "bg-[length:100%_1px]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={studio.phoneHref}
            className="link hidden text-[0.92rem] num md:inline-block"
          >
            {studio.phone}
          </a>
          <Button
            asChild
            size="sm"
            variant={onDark ? "light" : "solid"}
            className="hidden sm:inline-flex"
          >
            <Link href="/book">Book</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
              >
                <Menu className="size-6" strokeWidth={1.5} aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-rule bg-paper p-0 sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col justify-between px-7 pb-10 pt-24">
                <nav aria-label="Main" className="flex flex-col">
                  {nav.map((item, i) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "h3 border-b border-rule py-5 text-ink transition-colors duration-200 hover:text-clay",
                          i === 0 && "border-t",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="space-y-5">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/book">Book an appointment</Link>
                    </Button>
                  </SheetClose>
                  <div className="space-y-1 text-[0.92rem] text-ink-2">
                    <a href={studio.phoneHref} className="link num block">
                      {studio.phone}
                    </a>
                    <p>
                      {studio.street}, {studio.city}
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
