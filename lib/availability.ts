import { CLOSED_WEEKDAY, firstOpeningHour, lastOpeningHour } from "./studio";

export function dateKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function sameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * FNV-1a. The point is that a given room, therapist and hour always answers the
 * same way, so the grid does not reshuffle itself between renders.
 */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const HORIZON_DAYS = 60;

export function isClosed(date: Date): boolean {
  return date.getDay() === CLOSED_WEEKDAY;
}

export function isBookable(date: Date, now: Date): boolean {
  const day = startOfDay(date);
  const today = startOfDay(now);
  if (day < today) return false;
  if (isClosed(day)) return false;
  const horizon = startOfDay(now);
  horizon.setDate(horizon.getDate() + HORIZON_DAYS);
  return day <= horizon;
}

export function formatTime(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "pm" : "am";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:${String(minute).padStart(2, "0")}${suffix}`;
}

/**
 * Start times still open on a given day, in minutes from midnight.
 * Evenings and weekends run fuller, which is how the week actually goes.
 */
export function openSlots(
  date: Date,
  durationMinutes: number,
  therapistId: string,
  now: Date,
): number[] {
  if (!isBookable(date, now)) return [];

  const weekday = date.getDay();
  const opens = firstOpeningHour(weekday) * 60;
  const closes = lastOpeningHour(weekday) * 60;
  const key = dateKey(date);
  const isWeekend = weekday === 0 || weekday === 6;
  const nowMinutes = sameDay(date, now) ? now.getHours() * 60 + now.getMinutes() : -1;

  const slots: number[] = [];
  for (let start = opens; start + durationMinutes <= closes; start += 30) {
    // Give yourself time to get there.
    if (nowMinutes >= 0 && start < nowMinutes + 90) continue;

    let chance = isWeekend ? 46 : 62;
    if (start >= 17 * 60) chance -= 14;
    if (start < 13 * 60) chance += 8;

    if (hash(`${key}|${therapistId}|${start}`) % 100 < chance) slots.push(start);
  }
  return slots;
}

export function hasAnySlot(
  date: Date,
  durationMinutes: number,
  therapistId: string,
  now: Date,
): boolean {
  return openSlots(date, durationMinutes, therapistId, now).length > 0;
}
