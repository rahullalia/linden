import Link from "next/link";

import { hoursSummary, studio } from "@/lib/studio";

export function SiteFooter() {
  return (
    <footer className="bg-night text-paper">
      <div className="wrap grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="font-display text-[1.6rem] leading-none tracking-[0.16em]">LINDEN</p>
          <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-paper/70">
            Massage and bodywork. Four rooms, five therapists, one long block off Lorimer.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-[0.95rem] text-paper/60">Where</h2>
          <address className="mt-4 space-y-1 text-[0.95rem] not-italic leading-relaxed">
            <p>{studio.street}</p>
            <p>
              {studio.city}, {studio.state} {studio.zip}
            </p>
            <p className="pt-3">
              <a href={studio.phoneHref} className="link num">
                {studio.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${studio.email}`} className="link">
                {studio.email}
              </a>
            </p>
          </address>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-[0.95rem] text-paper/60">When</h2>
          <dl className="mt-4 space-y-1 text-[0.95rem]">
            {hoursSummary.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 md:block">
                <dt className="text-paper/70">{row.label}</dt>
                <dd className="num">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="text-[0.95rem] text-paper/60">More</h2>
          <ul className="mt-4 space-y-1.5 text-[0.95rem]">
            {[
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/first-visit", label: "First visit" },
              { href: "/gift-cards", label: "Gift cards" },
              { href: "/book", label: "Book" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-night-rule">
        <div className="wrap flex flex-col gap-2 py-7 text-[0.82rem] text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {studio.opened} to {new Date().getFullYear()} {studio.legalName}
          </p>
          <p>
            A concept site. Linden is not a real business and the booking calendar does not
            take real appointments.
          </p>
        </div>
      </div>
    </footer>
  );
}
