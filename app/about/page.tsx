import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { practitioners } from "@/lib/practitioners";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Linden opened on Withers Street in 2016 in a former picture framer's shop. Four rooms, five licensed therapists, hour long appointments, gratuity included.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="wrap pb-16 pt-[calc(var(--rail)+3.5rem)] md:pb-24 md:pt-[calc(var(--rail)+6rem)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="display max-w-[15ch]">A small place that stayed small.</h1>
          </div>
        </div>
      </div>

      <Reveal as="section" className="lift wrap">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <Image
              src="/photographs/curtain-light.webp"
              alt="Daylight through a linen curtain onto a plaster wall"
              width={1800}
              height={1208}
              sizes="(min-width: 768px) 48vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="space-y-5 text-bone-2 md:col-span-5 md:col-start-8 md:self-center">
            <p>
              Elena Duarte opened Linden in {studio.opened}, in a storefront on Withers Street
              that had been a picture framer for thirty years. She had spent seven years at a
              larger place in Manhattan and was tired of forty five minute slots and a schedule
              that never left room to finish anything.
            </p>
            <p>
              The plan was modest. Four rooms, appointments of an hour or more, and therapists
              who get to work on the same person over months instead of meeting them once. That
              is still how it runs.
            </p>
            <p>
              Five of us work here now. Everyone is licensed in New York State. Between us we
              handle post surgical work, pregnancy, athletes mid season, and a great many necks
              that have been looking down at a screen since 2011.
            </p>
          </div>
        </div>
      </Reveal>

      <section className="wrap py-24 md:py-36">
        <Reveal className="lift grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="h2">Who you will get</h2>
            <p className="mt-5 max-w-sm text-bone-2">
              You can ask for a specific person when you book, or leave it open and take
              whoever has the hour.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 border-t border-line">
          {practitioners.map((person, i) => (
            <Reveal
              as="li"
              key={person.id}
              delay={Math.min(i * 50, 200)}
              className="lift border-b border-line py-8 md:py-10"
            >
              <div className="grid gap-4 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <h3 className="h3">{person.name}</h3>
                  <p className="data mt-1 text-[0.88rem] text-bone-3">
                    {person.line}. Here since {person.since}.
                  </p>
                </div>
                <p className="max-w-xl text-bone-2 md:col-span-7 md:col-start-6">{person.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ground-2 py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="lift md:col-span-5 md:self-center">
            <h2 className="h2">On tipping</h2>
            <p className="mt-6 text-bone-2">
              Gratuity is built into every price on the site. We did that because tipping is
              awkward when you are half asleep and looking for your shoes, and because it meant
              we could pay people properly without pretending the number on the menu was the
              real number.
            </p>
            <p className="mt-4 text-bone-2">
              If someone did something you want to recognise anyway, tell us. It goes further
              than cash does.
            </p>
          </Reveal>
          <Reveal delay={80} className="lift md:col-span-6 md:col-start-7">
            <Image
              src="/photographs/reception.webp"
              alt="The front desk at Linden with a bell and a cup of tea"
              width={1600}
              height={1342}
              sizes="(min-width: 768px) 48vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <Reveal className="lift grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="h2">Where to find us</h2>
            <p className="mt-6 text-bone-2">
              {studio.street}, {studio.city}, between Leonard and Lorimer. Ground floor, one
              step up from the sidewalk. {studio.trains}. There is usually street parking after
              seven.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/book">Book an appointment</Link>
              </Button>
              <Button asChild variant="line" size="lg">
                <Link href="/first-visit">Read the practical bits</Link>
              </Button>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Image
              src="/photographs/branch.webp"
              alt="The shadow of a branch across a plaster wall"
              width={2000}
              height={1342}
              sizes="(min-width: 768px) 32vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
