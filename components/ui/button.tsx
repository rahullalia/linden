import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-3 font-mono uppercase tracking-[0.1em] whitespace-nowrap " +
    "transition-colors duration-[280ms] ease-[var(--ease-snap)] " +
    "disabled:pointer-events-none disabled:opacity-35 " +
    "[&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-[280ms] " +
    "[&_svg]:ease-[var(--ease-snap)] hover:[&_svg]:translate-x-1",
  {
    variants: {
      variant: {
        // Primary. Solid, never an outline.
        signal: "bg-signal text-ground hover:bg-bone",
        bone: "bg-bone text-ground hover:bg-signal",
        line: "wipe border border-line text-bone hover:border-signal hover:text-ground",
        bare: "text-bone hover:text-signal",
      },
      size: {
        sm: "h-10 px-4 text-[0.68rem]",
        md: "h-12 px-6 text-[0.72rem]",
        lg: "h-14 px-8 text-[0.76rem]",
      },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
