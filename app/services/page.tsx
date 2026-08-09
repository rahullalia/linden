import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { practitionersFor } from "@/lib/practitioners";
import { addOns, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services and prices",
  description:
    "Deep tissue, Swedish, sports recovery, lymphatic drainage, prenatal, hot stone, scalp and neck. Hour long appointments from $95. Gratuity included.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <div className="wrap pb-20 pt-36 md:pb-28 md:pt-48">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="display">What we do</h1>
            <p className="lede mt-7 max-w-lg">
              Eight things, all at least forty five minutes. Prices include gratuity, so the
              number next to the name is the number you pay.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-ink-2">
              Not sure which one? Book a sixty minute deep tissue and tell your therapist what
              is bothering you. They will adjust once they get a look at it.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ol className="border-t border-rule">
          {services.map((service, i) => {
            const roster = practitionersFor(service.slug);
            return (
              <Reveal
                as="li"
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 border-b border-rule py-12 md:py-16"
              >
                <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                  <div className="flex items-baseline gap-5 md:col-span-1">
                    <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="md:col-span-6">
                    <h2 className="h2">{service.name}</h2>
                    <p className="mt-5 max-w-lg text-ink-2">{service.long}</p>
                    <p className="mt-5 text-[0.92rem] text-ink-3">
                      {roster.length === 1
                        ? `${roster[0].name} takes these.`
                        : `Booked with ${roster
                            .slice(0, -1)
                            .map((p) => p.name.split(" ")[0])
                            .join(", ")} or ${roster[roster.length - 1].name.split(" ")[0]}.`}
                    </p>
                  </div>

                  <div className="md:col-span-4 md:col-start-9">
                    <dl className="border-t border-rule">
                      {service.options.map((option) => (
                        <div
                          key={option.minutes}
                          className="num flex items-baseline justify-between border-b border-rule py-3.5"
                        >
                          <dt className="text-ink-2">{option.minutes} minutes</dt>
                          <dd className="text-[1.05rem]">${option.price}</dd>
                        </div>
                      ))}
                    </dl>
                    <Button asChild variant="outline" size="sm" className="mt-6">
                      <Link href="/book">Book this</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="h2">Things you can add on</h2>
            <p className="mt-5 max-w-sm text-ink-2">
              Mention any of these when you book, or tell your therapist at the start. They go
              on the same bill.
            </p>
            <dl className="mt-9 border-t border-rule">
              {addOns.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-rule py-5"
                >
                  <dt className="h3">{item.name}</dt>
                  <dd className="num text-[1.05rem]">+${item.price}</dd>
                  <dd className="mt-1.5 w-full max-w-sm text-[0.94rem] text-ink-2">
                    {item.note}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={80} className="md:col-span-6 md:col-start-7">
            <Image
              src="/photographs/stones.webp"
              alt="Basalt stones on a slate tray"
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 48vw, 100vw"
              className="h-auto w-full"
            />
            <Image
              src="/photographs/oil-bowl.webp"
              alt="A ceramic bowl of oil beside dried linden blossom"
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 32vw, 66vw"
              className="mt-6 h-auto w-2/3"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
