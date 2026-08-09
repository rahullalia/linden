import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { durationLabel, priceRange, services } from "@/lib/services";
import { hoursSummary, studio } from "@/lib/studio";

export default function HomePage() {
  return (
    <>
      {/* The hero poster is the first thing painted, so fetch it early. */}
      <link
        rel="preload"
        as="image"
        href="/photographs/linen-still.webp"
        type="image/webp"
        fetchPriority="high"
      />

      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-night">
        <HeroVideo />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,18,14,0.5)_0%,rgba(20,18,14,0)_24%,rgba(20,18,14,0)_44%,rgba(20,18,14,0.5)_74%,rgba(20,18,14,0.86)_100%)]"
        />

        <div className="wrap relative pb-14 pt-32 md:pb-20">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="over-footage md:col-span-8">
              <h1 className="display max-w-[13ch] text-paper">
                We work on the thing that actually hurts.
              </h1>
              <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-paper/80">
                Linden is a four room massage studio on Withers Street in Williamsburg. Five
                licensed therapists. Open until nine most nights.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="light">
                  <Link href="/book">
                    Book an appointment
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="lightOutline">
                  <Link href="/services">See what we do</Link>
                </Button>
              </div>
            </div>

            <dl className="over-footage hidden text-[0.9rem] text-paper md:col-span-4 md:block md:justify-self-end md:text-right">
              {hoursSummary.map((row) => (
                <div key={row.label} className="flex justify-end gap-4 py-0.5">
                  <dt className="text-paper/70">{row.label}</dt>
                  <dd className="num w-[8.5rem]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:col-start-1">
            <p className="lede">
              There is no steam room here and nobody is going to hand you cucumber water. We
              have four rooms, warm tables, and therapists who have been doing this a long time.
            </p>
            <div className="mt-8 max-w-xl space-y-5 text-ink-2">
              <p>
                Most people book because something specific is wrong. A shoulder that has not
                been right since February. A lower back that acts up on the L train. Six weeks
                out from a race and the left calf will not let go.
              </p>
              <p>
                Tell your therapist what is going on when you get in. They will work on that,
                check the pressure once or twice, then mostly leave you alone.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90} className="md:col-span-4 md:col-start-9 md:pt-3">
            <div className="border-t border-rule pt-5 text-[0.95rem]">
              <p className="text-ink-2">
                {studio.street}
                <br />
                {studio.city}, {studio.state} {studio.zip}
              </p>
              <p className="mt-4 text-ink-3">{studio.trains}</p>
              <p className="mt-4">
                <a href={studio.phoneHref} className="link num">
                  {studio.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="relative">
        <div className="wrap">
          <div className="md:grid md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Image
                src="/photographs/room-wide.webp"
                alt="A treatment room at Linden with a linen dressed table and afternoon light across the floor"
                width={2000}
                height={1342}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-10 md:col-span-4 md:col-start-9 md:mt-0 md:self-end md:pb-6">
              <p className="text-ink-2">
                The rooms are small on purpose. Wood floors, one window each, a table that is
                already warm when you get in. You can hear the street a little. We decided that
                was better than piped in music.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="wrap py-24 md:py-36">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="h2">Eight things to book</h2>
            <p className="mt-5 max-w-sm text-ink-2">
              Every appointment runs at least an hour. Prices include gratuity, so the number
              you see is the number you pay.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-rule md:mt-16">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.slug}
              delay={Math.min(i * 45, 180)}
              className="border-b border-rule"
            >
              <Link
                href={`/services#${service.slug}`}
                className="group grid gap-x-6 gap-y-2 py-7 transition-colors duration-300 ease-[var(--ease-standard)] hover:bg-paper-2 md:grid-cols-12 md:py-8"
              >
                <span className="meta self-start pt-1.5 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-6">
                  <h3 className="h3 transition-colors duration-300 group-hover:text-clay">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[0.97rem] text-ink-2">{service.short}</p>
                </div>
                <div className="num flex gap-6 text-[0.95rem] text-ink-2 md:col-span-5 md:justify-end md:gap-12 md:pt-1.5">
                  <span>{durationLabel(service)}</span>
                  <span className="text-ink md:w-32 md:text-right">{priceRange(service)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              Read what each one involves
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="bg-paper-2 py-24 md:py-36">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <Image
              src="/photographs/room-table.webp"
              alt="The corner of a massage table, raking light across the linen"
              width={1400}
              height={1738}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={80} className="md:col-span-6 md:col-start-7 md:self-center">
            <blockquote>
              <p className="font-display text-[clamp(1.5rem,1rem+1.9vw,2.5rem)] leading-[1.25] tracking-[-0.02em]">
                I came in with a neck thing I had given up on. Elena spent the whole hour on my
                neck and shoulders instead of doing the full body tour like everywhere else.
                It was not relaxing. It worked.
              </p>
              <footer className="mt-7 text-[0.92rem] text-ink-3">
                Dana R., three blocks away, booked again the same week
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="wrap py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="h2">Booking takes about a minute</h2>
            <p className="mt-6 text-ink-2">
              Pick what you want and when, leave a name and a number, and you are done. Nothing
              gets charged online. We take a card at the front desk when you leave, and the
              price already has gratuity in it.
            </p>
            <p className="mt-4 text-ink-2">
              If you are not sure what to book, book a sixty minute deep tissue and say what is
              bothering you. Your therapist will adjust.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/book">
                  Book an appointment
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/first-visit">What to expect</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={80} className="md:col-span-6 md:col-start-7">
            <Image
              src="/photographs/corridor.webp"
              alt="The hallway at Linden with a door open at the far end"
              width={1400}
              height={1738}
              sizes="(min-width: 768px) 48vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
