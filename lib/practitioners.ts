export type Practitioner = {
  id: string;
  name: string;
  since: number;
  line: string;
  note: string;
  /** Service slugs this person takes. */
  does: string[];
};

export const practitioners: Practitioner[] = [
  {
    id: "elena",
    name: "Elena Duarte",
    since: 2016,
    line: "Deep tissue and clinical work",
    note: "Opened Linden in 2016 after seven years at a larger place in Manhattan. Swedish Institute, 2009. Works slowly and does not talk much.",
    does: ["deep-tissue", "swedish", "scalp-neck", "sports-recovery", "two-rooms"],
  },
  {
    id: "tomas",
    name: "Tomás Reyes",
    since: 2018,
    line: "Sports and recovery",
    note: "Spent four years with a running club in Prospect Park before this. Knows calves and IT bands. Ask him about race week.",
    does: ["sports-recovery", "deep-tissue", "swedish", "two-rooms"],
  },
  {
    id: "june",
    name: "June Okada",
    since: 2019,
    line: "Lymphatic drainage",
    note: "Trained in the Vodder method and takes most of our post surgical bookings. Lighter hands than you are expecting, on purpose.",
    does: ["lymphatic-drainage", "swedish", "scalp-neck", "two-rooms"],
  },
  {
    id: "priya",
    name: "Priya Menon",
    since: 2021,
    line: "Prenatal and deep tissue",
    note: "Has the side lying bolster setup down to about ninety seconds, which matters more than it sounds like it should.",
    does: ["prenatal", "deep-tissue", "swedish", "two-rooms"],
  },
  {
    id: "marcus",
    name: "Marcus Bell",
    since: 2022,
    line: "Hot stone, scalp and neck",
    note: "The one people book when the plan is to fall asleep. Came over from a hotel spa and was glad to leave the robes behind.",
    does: ["hot-stone", "scalp-neck", "swedish", "deep-tissue", "two-rooms"],
  },
];

export function practitionersFor(serviceSlug: string): Practitioner[] {
  return practitioners.filter((p) => p.does.includes(serviceSlug));
}
