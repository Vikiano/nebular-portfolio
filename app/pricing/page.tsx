import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Indicative pricing tiers for Nebular Labs photography licenses. Final quotes issued per-inquiry.",
};

const tiers = [
  {
    label: "Editorial single-use",
    price: "$150-$500 CAD",
    description: "One-time use in editorial context (magazine spread, news article, book cover). Single territory, twelve-month window.",
    includes: ["High-resolution JPEG", "Standard attribution", "Archive-quality metadata"],
  },
  {
    label: "Commercial (small)",
    price: "$600-$2,500 CAD",
    description: "Small-scale commercial: landing page hero, deck cover, in-store signage for one location. Twelve-month term, one territory.",
    includes: ["TIFF + JPEG delivery", "Optional RAW on agreement", "Usage rider + renewal clause"],
  },
  {
    label: "Commercial (campaign)",
    price: "Quote on request",
    description: "Multi-channel or multi-market campaign. Rates scale by reach, duration, exclusivity. Rush timelines available.",
    includes: ["Tailored licensing bundle", "Exclusivity windows negotiable", "Multi-format delivery"],
  },
  {
    label: "Personal prints",
    price: "$60-$240 CAD",
    description: "Signed prints on archival paper, numbered edition. Ships internationally when print queue opens 2026-Q3.",
    includes: ["A5 / A3 / A2 sizes", "Numbered edition of ten", "Signed on reverse"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Pricing</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Indicative tiers</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-obsidian-300">
          Final pricing is issued per inquiry and depends on use, territory, duration, and exclusivity. These ranges are indicative only and let you scope a first conversation.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((t) => (
          <article key={t.label} className="flex flex-col rounded border border-obsidian-800 bg-obsidian-900 p-6">
            <h2 className="font-display text-xl font-semibold text-obsidian-50">{t.label}</h2>
            <p className="mt-2 text-lg font-semibold text-cyan-accent">{t.price}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-obsidian-300">{t.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-obsidian-300">
              {t.includes.map((inc) => (
                <li key={inc} className="flex gap-2">
                  <span aria-hidden className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-warm-400" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded border border-obsidian-800 bg-obsidian-900 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-obsidian-50">Ready for a quote?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-obsidian-300">Tell Nebular Labs about the frame, the use, and the timeline. Response within five business days.</p>
        <Link href="/contact-waitlist" className="mt-5 inline-flex items-center justify-center rounded border border-cyan-accent bg-cyan-accent px-5 py-2 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-cyan-accent">
          Submit inquiry
        </Link>
      </div>
    </div>
  );
}
