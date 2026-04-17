import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-300">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Out of frame.</h1>
      <p className="mt-4 text-sm leading-relaxed text-obsidian-300">This page does not exist in the portfolio. Everything that does live here is reachable from the galleries page.</p>
      <Link href="/galleries" className="mt-6 inline-flex items-center justify-center rounded border border-cyan-accent bg-cyan-accent px-5 py-2 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-cyan-accent">
        Open the galleries
      </Link>
    </div>
  );
}
