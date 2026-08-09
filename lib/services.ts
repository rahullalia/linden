export type Option = { minutes: number; price: number };

export type Service = {
  slug: string;
  name: string;
  options: Option[];
  short: string;
  long: string;
};

export const services: Service[] = [
  {
    slug: "deep-tissue",
    name: "Deep tissue",
    options: [
      { minutes: 60, price: 135 },
      { minutes: 90, price: 195 },
    ],
    short: "Slow, firm work on one or two areas that are giving you trouble.",
    long: "Most of our appointments are this one. Your therapist spends the hour on whatever you came in for instead of covering your whole body evenly. Firm pressure, but you set the ceiling and you can move it during.",
  },
  {
    slug: "swedish",
    name: "Swedish",
    options: [
      { minutes: 60, price: 120 },
      { minutes: 90, price: 175 },
    ],
    short: "Lighter, full body, the kind you fall asleep during.",
    long: "Long strokes, moderate pressure, everything from your feet to your scalp. Book this when nothing hurts and you just want an hour off. Plenty of people book it after a hard week and remember none of it.",
  },
  {
    slug: "sports-recovery",
    name: "Sports and recovery",
    options: [
      { minutes: 60, price: 145 },
      { minutes: 90, price: 205 },
    ],
    short: "For training, racing, or the week after either one.",
    long: "Compression, stretching and direct work on the muscles you are actually using. Tell us what you are training for and how far out you are. The week before a race and the week after call for different things.",
  },
  {
    slug: "lymphatic-drainage",
    name: "Lymphatic drainage",
    options: [{ minutes: 75, price: 165 }],
    short: "Very light, very slow. Often booked after surgery.",
    long: "Nothing like a regular massage. The pressure is barely there and the pace is deliberate. June handles these. If you are post op, bring your surgeon's clearance and let us know the date of your procedure when you book.",
  },
  {
    slug: "prenatal",
    name: "Prenatal",
    options: [{ minutes: 60, price: 130 }],
    short: "Side lying, with a proper bolster setup. Second and third trimester.",
    long: "You lie on your side with cushions under the leg and belly, not face down on a table with a hole cut in it. Priya does these. If you are in your first trimester or have been told your pregnancy is high risk, check with your doctor first.",
  },
  {
    slug: "hot-stone",
    name: "Hot stone",
    options: [{ minutes: 90, price: 205 }],
    short: "Heated basalt stones worked into the back and shoulders.",
    long: "The stones sit around 130 degrees and go where the muscle is thickest. Heat gets into the back faster than hands do, so this is a good one in January or if you carry everything in your upper back.",
  },
  {
    slug: "scalp-neck",
    name: "Scalp and neck",
    options: [{ minutes: 45, price: 95 }],
    short: "Forty five minutes on the head, neck and jaw. You stay dressed.",
    long: "For headaches, a clenched jaw, or a neck that has been looking down at a screen all day. No oil in your hair unless you ask for it. This is the one to book on a lunch break.",
  },
  {
    slug: "two-rooms",
    name: "Two rooms",
    options: [{ minutes: 60, price: 270 }],
    short: "Two people, two therapists, two rooms at the same hour.",
    long: "We do not have a couples room and we are not going to pretend otherwise. What we can do is book you and one other person at the same time in adjacent rooms. You each pick your own service and you walk out together.",
  },
];

export const addOns = [
  { name: "Another 30 minutes", price: 60, note: "Ask when you book. Same therapist, same room." },
  { name: "Cupping", price: 20, note: "Adds marks that stay for a few days. Worth knowing before a wedding." },
  { name: "Arnica balm", price: 15, note: "Goes on at the end. Helps if you bruise easily." },
  { name: "Hot towels", price: 10, note: "On the back and feet at the finish." },
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export function priceRange(service: Service): string {
  const prices = service.options.map((o) => o.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  return low === high ? `$${low}` : `$${low} to $${high}`;
}

export function durationLabel(service: Service): string {
  return service.options.map((o) => o.minutes).join(" or ") + " min";
}
