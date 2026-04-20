import Link from "next/link";

const NAV_LINKS = [
  { href: "/treatments", label: "Treatments" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/results", label: "Results" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between md:px-8 md:py-10">
        {/* Left — wordmark */}
        <Link
          href="/"
          className="text-[20px] font-semibold tracking-tight text-teal"
        >
          Rooted
        </Link>

        {/* Centre — nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] font-medium text-ink/70 transition-colors hover:text-teal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — copyright */}
        <p className="text-[13px] text-ink/50">
          &copy; 2026 Rooted. All rights reserved.
        </p>
      </div>

      {/* Bottom line */}
      <div className="border-t border-hairline py-4 text-center">
        <p className="text-[12px] text-ink/35">
          Built by{" "}
          <a
            href="https://procivo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-teal"
          >
            Procivo
          </a>
        </p>
      </div>
    </footer>
  );
}
