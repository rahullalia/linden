import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Your first visit",
  description:
    "What to wear, how much pressure, tipping, cancellations, getting in the door. The practical answers before your first appointment at Linden.",
  alternates: { canonical: "/first-visit" },
};

const questions = [
  {
    q: "How early should I get there?",
    a: "Five minutes is plenty. If it is your first time, ten, because there is a short form about injuries and anything you are being treated for. If you are running late we still finish on the hour, because someone else has the room after you.",
  },
  {
    q: "What am I meant to take off?",
    a: "Whatever you are comfortable with. Most people leave their underwear on. You are under a sheet the whole time and only the part being worked on is uncovered. Your therapist knocks, then steps out while you get on the table.",
  },
  {
    q: "Is deep tissue going to hurt?",
    a: "It can be uncomfortable, in the way that stretching something tight is uncomfortable. It should not be something you lie there gritting your teeth through. Say so and we will ease off. You can say so more than once, and you will not be the first.",
  },
  {
    q: "Do I have to talk?",
    a: "No. Tell us what is bothering you at the start and then say nothing for an hour if you like. Nobody minds.",
  },
  {
    q: "What about tipping?",
    a: "Gratuity is in the price already. You do not need to leave anything, and the front desk will not ask.",
  },
  {
    q: "What if I need to cancel?",
    a: "A day's notice and there is no charge. Less than that and we bill half, since the hour usually cannot be filled. If you are sick, stay home and just tell us. We will not charge you for that.",
  },
  {
    q: "Can I get in the door?",
    a: "We are on the ground floor with one step up from the sidewalk, and the doorway is thirty four inches wide. The bathroom on our floor is not wheelchair accessible, which we know is a real problem and are trying to sort out with the building. Call ahead and we will tell you exactly what to expect.",
  },
  {
    q: "Should I book if I am pregnant?",
    a: "Yes, from the second trimester on, with Priya. You lie on your side with a bolster setup rather than face down. If you are in the first trimester or have been told your pregnancy is high risk, check with your doctor first.",
  },
  {
    q: "How do I get there?",
    a: `${studio.street}, between Leonard and Lorimer. ${studio.trains}. There is usually street parking after seven, and a lot on Union that never seems to fill up.`,
  },
];

export default function FirstVisitPage() {
  return (
    <>
      <div className="wrap pb-16 pt-[calc(var(--rail)+3.5rem)] md:pb-24 md:pt-[calc(var(--rail)+6rem)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="display max-w-[14ch]">Before you come in</h1>
            <p className="lede mt-7 max-w-lg">
              The questions people actually ask at the front desk, answered here so you do not
              have to.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-10 md:self-end">
            <p className="text-[0.95rem] text-bone-2">Something not covered?</p>
            <a href={studio.phoneHref} className="transition-colors duration-200 hover:text-signal data mt-1 inline-block">
              {studio.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap pb-24 md:pb-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="lift md:col-span-7">
            <Accordion type="single" collapsible className="border-t border-line">
              {questions.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`q-${i}`}
                  className="border-b border-line last:border-b"
                >
                  <AccordionTrigger className="h3 items-center py-6 text-left hover:no-underline [&>svg]:size-5 [&>svg]:text-bone-3">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pr-8">
                    <p className="max-w-xl text-[1rem] leading-relaxed text-bone-2">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal delay={90} className="lift md:col-span-4 md:col-start-9">
            <Image
              src="/photographs/linens.webp"
              alt="Folded linens on a walnut shelf"
              width={1400}
              height={1738}
              sizes="(min-width: 768px) 32vw, 100vw"
              className="h-auto w-full"
            />
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[0.95rem] text-bone-2">
                Sheets are washed hot between every appointment and the table is wiped down
                with everything else. If you want unscented oil, say so and you will get it.
              </p>
              <Button asChild size="lg" className="mt-7 w-full">
                <Link href="/book">Book an appointment</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
