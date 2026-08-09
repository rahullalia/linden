import Link from "next/link";

import { Button } from "@/components/ui/button";
import { studio } from "@/lib/studio";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70svh] flex-col justify-center pb-24 pt-40">
      <p className="num font-display text-[clamp(4rem,3rem+6vw,8rem)] leading-none text-ink-3">
        404
      </p>
      <h1 className="h2 mt-6 max-w-[18ch]">That page is not here any more, if it ever was.</h1>
      <p className="mt-5 max-w-md text-ink-2">
        Try the services list, or call the front desk and someone will point you the right way.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to the start</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={studio.phoneHref}>{studio.phone}</a>
        </Button>
      </div>
    </div>
  );
}
