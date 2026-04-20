const ITEMS = [
  "FDA-cleared technology",
  "Trichologist-designed plans",
  "Mobile service across the UK",
  "No clinic visits needed",
  "Results in 90 days",
  "Free consultation",
];

export default function TrustBar() {
  // Render the list twice back-to-back and translate by -50% so the
  // loop is seamless. Dot separator "·" is inlined between items.
  const renderGroup = (groupKey: string) => (
    <ul
      key={groupKey}
      aria-hidden={groupKey === "b"}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {ITEMS.map((item, i) => (
        <li
          key={`${groupKey}-${i}`}
          className="flex items-center gap-10 whitespace-nowrap"
        >
          <span>{item}</span>
          <span className="text-teal/50" aria-hidden="true">
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Trust signals"
      className="w-full overflow-hidden bg-mist"
      style={{ height: 48 }}
    >
      <div
        className="flex h-full items-center text-teal"
        style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.01em" }}
      >
        <div className="trust-ticker-track flex will-change-transform">
          {renderGroup("a")}
          {renderGroup("b")}
        </div>
      </div>
    </section>
  );
}
