/**
 * The column rules the layout is built on, drawn rather than implied.
 * Decorative, fixed behind everything, and only worth showing once there is
 * enough width for the grid to mean anything.
 */
export function GridRules() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
    >
      <div className="wrap grid h-full grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="border-l border-line-soft last:border-r" />
        ))}
      </div>
    </div>
  );
}
