import Link from "next/link";

import { hoursSummary, studio } from "@/lib/studio";

const pages = [
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/first-visit", label: "First visit" },
  { href: "/gift-cards", label: "Gift cards" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-ground">
      <div className="wrap">
        <p className="display py-10 text-bone md:py-16">Linden</p>
      </div>

      <div className="wrap grid gap-10 border-t border-line py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-3">
          <h2 className="tag">Where</h2>
          <address className="mt-4 space-y-0.5 text-[0.95rem] not-italic text-bone-2">
            <p>{studio.street}</p>
            <p>
              {studio.city}, {studio.state} {studio.zip}
            </p>
            <p className="pt-3 text-bone-3">{studio.trains}</p>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="tag">Hours</h2>
          <dl className="mt-4 space-y-0.5 text-[0.95rem] text-bone-2">
            {hoursSummary.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt>{row.label}</dt>
                <dd className="data text-bone">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-3">
          <h2 className="tag">Reach us</h2>
          <div className="mt-4 space-y-0.5 text-[0.95rem]">
            <a
              href={studio.phoneHref}
              className="data block text-bone transition-colors duration-200 hover:text-signal"
            >
              {studio.phone}
            </a>
            <a
              href={`mailto:${studio.email}`}
              className="block text-bone-2 transition-colors duration-200 hover:text-signal"
            >
              {studio.email}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-11">
          <h2 className="tag">Pages</h2>
          <ul className="mt-4 space-y-1 text-[0.95rem]">
            {pages.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-bone-2 transition-colors duration-200 hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="tag">
          {studio.opened} to {new Date().getFullYear()} {studio.legalName}
        </p>
        <p className="tag max-w-md sm:text-right">
          A concept site. Linden is not a real business and the booking calendar does not take
          real appointments.
        </p>
      </div>
    </footer>
  );
}
