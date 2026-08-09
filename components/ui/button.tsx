import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] font-sans whitespace-nowrap " +
    "transition-[background-color,color,border-color] duration-200 ease-[var(--ease-standard)] " +
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-40 " +
    "[&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-clay",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
        quiet: "text-ink hover:text-clay",
        light: "bg-paper text-ink hover:bg-clay hover:text-paper",
        lightOutline:
          "border border-paper/35 text-paper hover:bg-paper hover:text-ink hover:border-paper",
      },
      size: {
        sm: "h-10 px-5 text-[0.82rem] tracking-[0.01em]",
        md: "h-12 px-7 text-[0.9rem] tracking-[0.01em]",
        lg: "h-14 px-9 text-[0.95rem] tracking-[0.01em]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
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
