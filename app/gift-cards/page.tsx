import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Gift cards",
  description:
    "Gift cards for Linden in any amount from $95. They do not expire, and whatever is left after an appointment stays on the card.",
  alternates: { canonical: "/gift-cards" },
};

const amounts = [
  { value: 95, note: "Covers a forty five minute scalp and neck" },
  { value: 135, note: "Covers a sixty minute deep tissue" },
  { value: 195, note: "Covers ninety minutes of deep tissue" },
  { value: 270, note: "Two people, two rooms, same hour" },
];

export default function GiftCardsPage() {
  const subject = encodeURIComponent("Gift card");
  const body = encodeURIComponent(
    "Amount:\nWho it is for:\nTheir email (or post it to me):\nAnything you want written on it:\n",
  );

  return (
    <div className="wrap pb-28 pt-36 md:pb-36 md:pt-48">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="display max-w-[12ch]">Gift cards</h1>
          <p className="lede mt-7 max-w-lg">
            Any amount from $95. They do not expire, and whatever is left over after an
            appointment stays on the card.
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-6">
          <dl className="border-t border-rule">
            {amounts.map((amount) => (
              <div
                key={amount.value}
                className="flex items-baseline justify-between gap-8 border-b border-rule py-6"
              >
                <dt className="num font-display text-[1.9rem] leading-none">${amount.value}</dt>
                <dd className="text-right text-[0.95rem] text-ink-2">{amount.note}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 space-y-5 text-ink-2">
            <p>
              Email us the amount and who it is for and we will send a card the same day, or
              post a paper one in a linen envelope if you would rather hand it over. There is
              no fee either way.
            </p>
            <p>
              Whoever receives it books like anyone else and gives the code at the front desk.
              If their appointment costs more than the card, they pay the difference then.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`mailto:${studio.email}?subject=${subject}&body=${body}`}>
                Email us for a card
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={studio.phoneHref}>{studio.phone}</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80} className="md:col-span-5 md:col-start-8">
          <Image
            src="/photographs/oil-bowl.webp"
            alt="A ceramic bowl of oil beside dried linden blossom on an oak counter"
            width={1200}
            height={1200}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-auto w-full"
          />
          <p className="mt-8 border-t border-rule pt-6 text-[0.95rem] text-ink-2">
            Buying for someone who has not been in before? Point them at{" "}
            <Link href="/first-visit" className="link text-ink">
              the first visit page
            </Link>
            . It answers most of what people are quietly wondering about.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
