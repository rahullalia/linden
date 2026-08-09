import type { Metadata } from "next";

import { BookingFlow } from "@/components/booking/booking-flow";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Pick a service, a therapist and a time. Nothing is charged online and gratuity is already in the price.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="wrap pb-28 pt-36 md:pb-36 md:pt-48">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="display">Book a table</h1>
          <p className="lede mt-7 max-w-lg">
            Four short steps. Nothing is charged online, and the price you see already has
            gratuity in it.
          </p>
        </div>
        <div className="text-[0.95rem] text-ink-2 md:col-span-3 md:col-start-10 md:self-end md:text-right">
          <p>Rather do this out loud?</p>
          <a href={studio.phoneHref} className="link num mt-1 inline-block text-ink">
            {studio.phone}
          </a>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <BookingFlow />
      </div>
    </div>
  );
}
