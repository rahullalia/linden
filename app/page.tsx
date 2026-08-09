import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footage } from "@/components/footage";
import { OpeningsBoard } from "@/components/openings-board";
import { MaskedLines, Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { studio } from "@/lib/studio";

export default function HomePage() {
  return (
    <>
      {/* Nothing in the first screen animates in. An entrance here would hold
          the largest paint behind its own transition, and make you wait to read
          the one line the page is actually about. Reveals start below the fold. */}
      <section className="wrap pb-16 pt-[calc(var(--rail)+2.5rem)] md:pb-24 md:pt-[calc(var(--rail)+4rem)]">
        <h1 className="display">
          Tell us where
          <br />
          it hurts.
        </h1>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="lede max-w-md">
              Four rooms on Withers Street in Williamsburg. Sixty or ninety minutes on the one
              thing that is actually wrong, instead of a full body tour. Open until nine.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="flex items-baseline justify-between gap-4 pb-3">
              <p className="tag">Next openings</p>
              <p className="tag">{studio.street}</p>
            </div>
            <OpeningsBoard />
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="md" variant="signal">
                <Link href="/book">
                  See every time
                  <ArrowRight strokeWidth={1.75} aria-hidden />
                </Link>
              </Button>
              <Button asChild size="md" variant="line">
                <Link href="/services">What it costs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap border-t border-line py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <MaskedLines
            as="h2"
            className="h2 md:col-span-7"
            lines={["No steam room.", "No cucumber water."]}
          />
          <Reveal className="lift space-y-5 text-bone-2 md:col-span-4 md:col-start-9" delay={120}>
            <p>
              What we have is four rooms, five therapists, and a table that is already warm
              when you get on it.
            </p>
            <p>
              Most people arrive with something specific. A shoulder that has not been right
              since February. A lower back that goes on the L. A calf six weeks out from a
              race.
            </p>
            <p>
              Say what it is at the start. Your therapist works on that, checks the pressure
              twice, then leaves you alone.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap border-t border-line py-20 md:py-32">
        <div className="grid gap-6 md:grid-cols-12">
          <MaskedLines as="h2" className="h2 md:col-span-4" lines={["The list"]} />
          <Reveal className="lift md:col-span-5 md:col-start-8" delay={100}>
            <p className="text-bone-2">
              Every appointment runs at least forty five minutes. Gratuity is in the price, so
              the number on the right is the number you pay.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 border-t border-line md:mt-16">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} className="lift" delay={Math.min(i * 40, 200)}>
              <Link
                href={`/services#${service.slug}`}
                className="group/row grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-line py-5 transition-colors duration-200 ease-[var(--ease-snap)] hover:bg-ground-2 md:grid-cols-[4rem_1fr_8rem_7rem] md:gap-x-8 md:py-6"
              >
                <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 transition-colors duration-200 group-hover/row:text-signal">
                  {service.name}
                </h3>
                <span className="data col-start-3 row-start-1 text-right text-[0.95rem] text-bone md:col-start-4 md:order-last">
                  {service.options.map((o) => `$${o.price}`).join(" / ")}
                </span>
                <span className="data col-span-2 col-start-2 text-[0.82rem] text-bone-3 md:col-span-1 md:col-start-3 md:row-start-1 md:text-left md:text-[0.9rem]">
                  {service.options.map((o) => o.minutes).join(" / ")} min
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-line">
        <figure>
          <div className="relative h-[45svh] w-full overflow-hidden md:h-[78svh]">
            <Footage />
          </div>
          <figcaption className="wrap flex justify-between gap-6 border-t border-line py-4">
            <span className="tag">The linen shelf</span>
            <span className="tag">Late morning, room three</span>
          </figcaption>
        </figure>
      </section>

      <section className="wrap border-t border-line py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="lift md:col-span-8">
            <blockquote>
              <p className="h2 text-bone">
                &ldquo;I came in with a neck thing I had given up on. Elena spent the whole hour
                on my neck and shoulders instead of the full body tour. It was not relaxing. It
                worked.&rdquo;
              </p>
              <footer className="tag mt-8">
                Dana R. &middot; three blocks away &middot; booked again the same week
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="wrap border-t border-line py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <MaskedLines
            as="h2"
            className="h2 md:col-span-6"
            lines={["Booking takes", "about a minute"]}
          />
          <Reveal className="lift md:col-span-5 md:col-start-8" delay={120}>
            <p className="text-bone-2">
              Pick what you want and when, leave a name and a number, and you are done. Nothing
              is charged online. We take a card at the front desk when you leave.
            </p>
            <p className="mt-4 text-bone-2">
              Not sure what to book? Take a sixty minute deep tissue and say what is bothering
              you. Your therapist will adjust once they have had a look.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button asChild size="lg" variant="signal">
                <Link href="/book">
                  Book an appointment
                  <ArrowRight strokeWidth={1.75} aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="line">
                <Link href="/first-visit">What to expect</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
