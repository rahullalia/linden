export const studio = {
  name: "Linden",
  legalName: "Linden Massage & Bodywork",
  tagline: "Massage and bodywork on Withers Street",
  opened: 2016,
  rooms: 4,
  therapists: 5,
  street: "264 Withers Street",
  unit: "Ground floor",
  city: "Brooklyn",
  state: "NY",
  zip: "11211",
  phone: "(718) 555-0142",
  phoneHref: "tel:+17185550142",
  email: "front@lindenbodywork.com",
  trains: "Lorimer St L and Metropolitan Av G, four minutes on foot",
  hours: [
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: "11:00", close: "21:00" },
    { day: "Wednesday", open: "11:00", close: "21:00" },
    { day: "Thursday", open: "11:00", close: "21:00" },
    { day: "Friday", open: "11:00", close: "21:00" },
    { day: "Saturday", open: "10:00", close: "19:00" },
    { day: "Sunday", open: "10:00", close: "18:00" },
  ],
} as const;

export const hoursSummary = [
  { label: "Tue to Fri", value: "11am to 9pm" },
  { label: "Saturday", value: "10am to 7pm" },
  { label: "Sunday", value: "10am to 6pm" },
  { label: "Monday", value: "Closed" },
];

/** Sunday is 0. Monday is the one day nobody is in the building. */
export const CLOSED_WEEKDAY = 1;

export function lastOpeningHour(weekday: number): number {
  if (weekday === 0) return 18;
  if (weekday === 6) return 19;
  return 21;
}

export function firstOpeningHour(weekday: number): number {
  return weekday === 0 || weekday === 6 ? 10 : 11;
}
