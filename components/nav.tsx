import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/galleries", label: "Galleries" },
  { href: "/series/vancouver-street", label: "Series" },
  { href: "/licensing", label: "Licensing" },
  { href: "/about-nebular", label: "About" },
  { href: "/contact-waitlist", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-obsidian-700 bg-obsidian-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-obsidian-50 transition hover:text-cyan-accent">
          Nebular Labs
          <span className="ml-2 hidden font-sans text-xs font-normal uppercase tracking-[0.2em] text-obsidian-400 md:inline">Portfolio</span>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-5 text-sm text-obsidian-200 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-cyan-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
