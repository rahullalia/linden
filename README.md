# Linden

Website for a small massage studio in Williamsburg, Brooklyn. Six pages, an appointment
booker with a real calendar, and a live board of the next open times.

Linden is not a real business. This is a concept site, and the booking flow does not
create appointments or send anything anywhere.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build    # production build, also type checks
npm start        # serve the build
```

Node 20.9 or newer.

## How it is put together

Next.js 16 on the App Router, React 19, Tailwind v4, TypeScript. Every route is
statically generated at build time; there is no database and no API.

```
app/                 one folder per route, plus sitemap, robots and the favicon
components/
  ui/                Radix primitives, restyled
  booking/           the appointment flow
lib/                 studio details, services, practitioners, availability
scripts/             image pipeline
public/photographs/  web sized images, generated
public/video/        hero footage
```

Colour, type and easing tokens live at the top of `app/globals.css`. Below them is a
second block that points the generic token names the Radix components expect at the same
palette, so the primitives inherit the design rather than needing per component overrides.

Type is Archivo on its width axis for display and JetBrains Mono for anything numeric.
The twelve column rules the layout sits on are drawn rather than implied, from
`components/grid-rules.tsx`.

### The board

The home page opens on the next three times anybody is free, worked out in the browser
from the same `lib/availability.ts` the booker uses, so the two can never disagree. Each
row carries the whole choice into `/book` as search params, which turns taking one of
those times into a single step instead of four. A stale or nonsense link falls back to the
nearest step it can honour rather than erroring.

### The booking flow

Four steps that collapse to a summary line once answered, with a running total in the
sidebar. It holds state in the component and never calls a server.

Availability is generated, not stored. `lib/availability.ts` hashes the date, the therapist
and the start time with FNV-1a and compares the result to a threshold that varies by time
of day and day of week. Same inputs always give the same answer, so the grid does not
reshuffle between renders, and there is no hydration mismatch. Mondays are closed, days in
the past are disabled, and today only offers slots at least ninety minutes out.

The calendar is react-day-picker with the shadcn wrapper replaced, which keeps the roving
tabindex and grid semantics while letting the styling go where it needed to.

### Images

Masters are not in the repo. Put them in `assets/photographs/` and run:

```bash
node scripts/build-images.mjs
```

That resizes, adds a little grain so flat plaster and linen do not band, strips metadata
and writes WebP into `public/photographs/`, plus a 1200x630 JPEG for the Open Graph card.

The photography and the hero footage were generated with Google's Nano Banana Pro and Veo
3.1, and carry SynthID watermarking in the pixels.

### Performance

The band of footage partway down the page only downloads on screens 768px and wider, and
never when the visitor has asked for reduced motion or has Save Data on. Phones get the
poster frame and nothing else, which keeps about a megabyte off the page.

Nothing in the first screen animates in. An entrance there would hold the largest paint
behind its own transition, which cost three points and half a second when it was tried.
Reveals start below the fold.

Scroll reveals are gated behind a flag set by an inline script, so with scripting off the
copy is simply there rather than sitting at zero opacity.

## Deploying to Vercel

Either import the repository at [vercel.com/new](https://vercel.com/new) and accept the
detected settings, or from the project directory:

```bash
npm i -g vercel
vercel link
vercel --prod
```

There is nothing to configure. No environment variables, no build overrides, no external
services. Vercel detects Next.js, runs `next build`, and serves it.

To use your own domain, add it under Settings then Domains and point the DNS records Vercel
gives you. If the domain is somewhere else, that is a CNAME to `cname.vercel-dns.com`.

Two things to change before a real deploy: the `site` constant in `app/layout.tsx` and the
one in `app/sitemap.ts` and `app/robots.ts`, which set the canonical URLs and the Open Graph
image path.
