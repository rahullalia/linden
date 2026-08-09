"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  HORIZON_DAYS,
  formatTime,
  hasAnySlot,
  isBookable,
  openSlots,
  startOfDay,
} from "@/lib/availability";
import { practitionersFor } from "@/lib/practitioners";
import { serviceBySlug, services } from "@/lib/services";
import { studio } from "@/lib/studio";
import { cn } from "@/lib/utils";

type Chosen = { slug: string; option: number };

const NO_PREFERENCE = "any";

const longDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function BookingFlow() {
  const [now, setNow] = useState<Date | null>(null);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<Chosen | null>(null);
  const [therapist, setTherapist] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<number | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // The calendar depends on the visitor's clock, so it waits for the browser.
  useEffect(() => setNow(new Date()), []);

  const service = chosen ? serviceBySlug.get(chosen.slug) : undefined;
  const option = service && chosen ? service.options[chosen.option] : undefined;
  const roster = chosen ? practitionersFor(chosen.slug) : [];
  const therapistName =
    therapist && therapist !== NO_PREFERENCE
      ? roster.find((p) => p.id === therapist)?.name
      : "Whoever is free";

  const slots = useMemo(() => {
    if (!date || !option || !therapist || !now) return [];
    return openSlots(date, option.minutes, therapist, now);
  }, [date, option, therapist, now]);

  const range = useMemo(() => {
    if (!now) return null;
    const end = startOfDay(now);
    end.setDate(end.getDate() + HORIZON_DAYS);
    return { start: startOfDay(now), end };
  }, [now]);

  function pickService(slug: string, optionIndex: number) {
    setChosen({ slug, option: optionIndex });
    setTherapist(null);
    setDate(undefined);
    setTime(null);
    setStep(1);
  }

  function pickTherapist(id: string) {
    setTherapist(id);
    setDate(undefined);
    setTime(null);
    setStep(2);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!details.name.trim()) next.name = "We need a name for the appointment.";
    if (!details.email.trim() && !details.phone.trim())
      next.contact = "Leave an email or a phone number so we can reach you.";
    if (details.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
      next.email = "That email address does not look right.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBooked(true);
    requestAnimationFrame(() =>
      confirmationRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }),
    );
  }

  if (booked && service && option && date && time !== null) {
    return (
      <div ref={confirmationRef} className="border-t border-rule pt-12">
        <div className="flex size-11 items-center justify-center rounded-full border border-ink">
          <Check className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
        <h2 className="h2 mt-7">You are down for {longDate.format(date)}.</h2>
        <p className="mt-5 max-w-md text-ink-2">
          Nothing was charged. We take a card at the front desk when you leave, and the price
          already includes gratuity. If something changes, call us at least a day ahead.
        </p>

        <dl className="mt-10 max-w-lg border-t border-rule">
          {[
            ["What", `${service.name}, ${option.minutes} minutes`],
            ["With", therapistName ?? "Whoever is free"],
            ["When", `${longDate.format(date)} at ${formatTime(time)}`],
            ["Where", `${studio.street}, ${studio.city}`],
            ["Price", `$${option.price}, gratuity included`],
            ["Name", details.name],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-8 border-b border-rule py-4">
              <dt className="text-ink-3">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-md text-[0.9rem] text-ink-3">
          This is a concept site, so no appointment was actually made and nobody was emailed.
        </p>

        <Button
          variant="outline"
          size="lg"
          className="mt-8"
          onClick={() => {
            setBooked(false);
            setChosen(null);
            setTherapist(null);
            setDate(undefined);
            setTime(null);
            setDetails({ name: "", email: "", phone: "", notes: "" });
            setStep(0);
          }}
        >
          Start another one
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-14 md:grid-cols-12 md:gap-10">
      <ol className="md:col-span-7 md:col-start-1">
        <Step
          index={0}
          title="What do you want booked?"
          open={step === 0}
          summary={service && option ? `${service.name}, ${option.minutes} min` : null}
          onOpen={() => setStep(0)}
        >
          <fieldset className="space-y-0 border-t border-rule">
            <legend className="sr-only">Choose a service</legend>
            {services.map((item) => (
              <div key={item.slug} className="border-b border-rule py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                  <div className="max-w-sm">
                    <p className="h3">{item.name}</p>
                    <p className="mt-1 text-[0.94rem] text-ink-2">{item.short}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.options.map((opt, i) => {
                      const id = `${item.slug}-${opt.minutes}`;
                      const active = chosen?.slug === item.slug && chosen.option === i;
                      return (
                        <div key={id}>
                          <input
                            type="radio"
                            id={id}
                            name="appointment"
                            className="peer sr-only"
                            checked={active}
                            onChange={() => pickService(item.slug, i)}
                          />
                          <label
                            htmlFor={id}
                            className={cn(
                              "num inline-flex cursor-pointer items-center gap-2 rounded-[2px] border px-4 py-2.5 text-[0.88rem]",
                              "transition-colors duration-200 ease-[var(--ease-standard)]",
                              "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay",
                              active
                                ? "border-ink bg-ink text-paper"
                                : "border-rule text-ink hover:border-ink",
                            )}
                          >
                            <span>{opt.minutes} min</span>
                            <span className={active ? "text-paper/60" : "text-ink-3"}>
                              ${opt.price}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </fieldset>
        </Step>

        <Step
          index={1}
          title="Anyone in particular?"
          open={step === 1}
          locked={!chosen}
          summary={therapist ? (therapistName ?? null) : null}
          onOpen={() => setStep(1)}
        >
          <fieldset className="border-t border-rule">
            <legend className="sr-only">Choose a therapist</legend>
            {[
              { id: NO_PREFERENCE, name: "Whoever is free", line: "Usually the widest choice of times" },
              ...roster.map((p) => ({ id: p.id, name: p.name, line: p.line })),
            ].map((person) => {
              const active = therapist === person.id;
              return (
                <div key={person.id}>
                  <input
                    type="radio"
                    id={`t-${person.id}`}
                    name="therapist"
                    className="peer sr-only"
                    checked={active}
                    onChange={() => pickTherapist(person.id)}
                  />
                  <label
                    htmlFor={`t-${person.id}`}
                    className={cn(
                      "flex cursor-pointer items-baseline justify-between gap-6 border-b border-rule py-5",
                      "transition-colors duration-200 ease-[var(--ease-standard)] hover:bg-paper-2",
                      "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-clay",
                      active && "bg-paper-2",
                    )}
                  >
                    <span className="h3">{person.name}</span>
                    <span className="text-right text-[0.92rem] text-ink-2">{person.line}</span>
                  </label>
                </div>
              );
            })}
          </fieldset>
        </Step>

        <Step
          index={2}
          title="When suits you?"
          open={step === 2}
          locked={!therapist}
          summary={
            date && time !== null ? `${longDate.format(date)}, ${formatTime(time)}` : null
          }
          onOpen={() => setStep(2)}
        >
          {now && range && option && therapist ? (
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={range.start}
                onSelect={(next) => {
                  setDate(next);
                  setTime(null);
                }}
                startMonth={range.start}
                endMonth={range.end}
                disabled={(day) =>
                  !isBookable(day, now) || !hasAnySlot(day, option.minutes, therapist, now)
                }
              />

              <div>
                {date ? (
                  slots.length > 0 ? (
                    <>
                      <p className="text-[0.94rem] text-ink-2">
                        Open on {longDate.format(date)}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setTime(slot);
                              setStep(3);
                            }}
                            className={cn(
                              "num rounded-[2px] border py-2.5 text-[0.86rem]",
                              "transition-colors duration-200 ease-[var(--ease-standard)]",
                              time === slot
                                ? "border-ink bg-ink text-paper"
                                : "border-rule hover:border-ink",
                            )}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-ink-2">
                      Nothing left on that day. Try the one after it.
                    </p>
                  )
                ) : (
                  <p className="text-ink-2">
                    Pick a day. Greyed out days are either full or a Monday, when we are
                    closed.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 animate-pulse bg-paper-2" aria-hidden />
          )}
        </Step>

        <Step
          index={3}
          title="Who is coming in?"
          open={step === 3}
          locked={time === null}
          summary={null}
          onOpen={() => setStep(3)}
          last
        >
          <form onSubmit={submit} noValidate className="max-w-md space-y-6">
            <Field
              id="name"
              label="Name"
              value={details.name}
              error={errors.name}
              autoComplete="name"
              onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={details.email}
              error={errors.email}
              autoComplete="email"
              onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
            />
            <Field
              id="phone"
              label="Phone"
              type="tel"
              value={details.phone}
              autoComplete="tel"
              onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
            />
            {errors.contact ? (
              <p role="alert" className="text-[0.88rem] text-destructive">
                {errors.contact}
              </p>
            ) : null}
            <div>
              <label htmlFor="notes" className="block text-[0.88rem] text-ink-2">
                Anything your therapist should know
              </label>
              <textarea
                id="notes"
                rows={3}
                value={details.notes}
                onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                placeholder="Injuries, surgeries, pregnancy, areas to leave alone"
                className="mt-2 w-full rounded-[2px] border border-rule bg-transparent px-4 py-3 text-[0.95rem] placeholder:text-ink-3/70 focus:border-ink focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg">
              Hold this appointment
            </Button>
          </form>
        </Step>
      </ol>

      <aside className="md:col-span-4 md:col-start-9">
        <div className="border-t border-rule pt-6 md:sticky md:top-28">
          <h2 className="h3">Your appointment</h2>
          <dl className="mt-5 space-y-3 text-[0.95rem]">
            <Line label="Service" value={service ? service.name : null} />
            <Line label="Length" value={option ? `${option.minutes} minutes` : null} />
            <Line label="With" value={therapist ? (therapistName ?? null) : null} />
            <Line
              label="When"
              value={
                date && time !== null ? `${longDate.format(date)}, ${formatTime(time)}` : null
              }
            />
            <Line label="Price" value={option ? `$${option.price}` : null} />
          </dl>
          <p className="mt-7 border-t border-rule pt-5 text-[0.9rem] text-ink-3">
            Gratuity is in the price. Nothing is charged online. Cancel a day ahead and there
            is no fee.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-ink-3">{label}</dt>
      <dd className={cn("text-right", !value && "text-ink-3")}>{value || "Not yet"}</dd>
    </div>
  );
}

function Step({
  index,
  title,
  open,
  locked = false,
  summary,
  onOpen,
  last = false,
  children,
}: {
  index: number;
  title: string;
  open: boolean;
  locked?: boolean;
  summary?: string | null;
  onOpen: () => void;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("border-t border-rule", last && "border-b")}>
      <h2>
        <button
          type="button"
          onClick={onOpen}
          disabled={locked}
          aria-expanded={open}
          className={cn(
            "flex w-full items-baseline gap-5 py-6 text-left",
            "transition-opacity duration-300",
            locked && "cursor-default opacity-35",
          )}
        >
          <span className="meta pt-1">{String(index + 1).padStart(2, "0")}</span>
          <span className="h3 flex-1">{title}</span>
          {summary && !open ? (
            <span className="hidden text-right text-[0.92rem] text-ink-2 sm:block">
              {summary}
            </span>
          ) : null}
        </button>
      </h2>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="pb-10">{children}</div>
        </div>
      </div>
    </li>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.88rem] text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-2 h-12 w-full rounded-[2px] border bg-transparent px-4 text-[0.95rem]",
          "transition-colors duration-200 focus:outline-none",
          error ? "border-destructive" : "border-rule focus:border-ink",
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[0.88rem] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
