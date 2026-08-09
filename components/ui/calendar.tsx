"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayButton, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full", className)}
      formatters={{
        formatWeekdayName: (date) => WEEKDAY[date.getDay()],
        formatCaption: (date) =>
          date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      }}
      classNames={{
        // The month arrows are absolutely placed, so the root has to be the
        // thing they measure against.
        root: "relative w-full",
        months: "flex flex-col",
        month: "relative flex w-full flex-col",
        month_caption: "flex h-11 items-center",
        caption_label:
          "font-display text-[1.3rem] leading-none tracking-[-0.02em] text-ink",
        // z-10 because the caption row is full width and would otherwise
        // swallow the clicks.
        nav: "absolute right-0 top-0 z-10 flex h-11 items-center gap-1",
        button_previous:
          "inline-flex size-9 items-center justify-center text-ink transition-colors duration-200 hover:text-clay disabled:pointer-events-none disabled:opacity-25",
        button_next:
          "inline-flex size-9 items-center justify-center text-ink transition-colors duration-200 hover:text-clay disabled:pointer-events-none disabled:opacity-25",
        month_grid: "mt-4 w-full border-collapse border-l border-t border-rule",
        weekdays: "flex",
        weekday:
          "flex-1 border-b border-r border-rule py-2 text-[0.68rem] font-normal uppercase tracking-[0.1em] text-ink-3",
        week: "flex w-full",
        day: "group/day relative flex-1 border-b border-r border-rule p-0",
        today: "",
        outside: "opacity-0",
        disabled: "",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass, ...rest }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return (
            <Icon
              className={cn("size-[1.15rem]", chevronClass)}
              strokeWidth={1.5}
              {...rest}
            />
          );
        },
        DayButton: LindenDay,
      }}
      {...props}
    />
  );
}

function LindenDay({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-selected={modifiers.selected || undefined}
      className={cn(
        "num relative flex aspect-square w-full items-center justify-center text-[0.95rem]",
        "transition-colors duration-200 ease-[var(--ease-standard)]",
        "text-ink hover:bg-paper-2",
        "disabled:pointer-events-none disabled:text-ink-3/45",
        "data-[selected=true]:bg-ink data-[selected=true]:text-paper",
        className,
      )}
      {...props}
    >
      {day.date.getDate()}
      {modifiers.today && !modifiers.selected ? (
        <span
          aria-hidden
          className="absolute bottom-[18%] size-[3px] rounded-full bg-clay"
        />
      ) : null}
    </button>
  );
}

export { Calendar };
