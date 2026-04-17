import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-obsidian-700 bg-obsidian-950 px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg font-semibold text-obsidian-50">Nebular Labs Portfolio</p>
          <p className="mt-2 text-sm leading-relaxed text-obsidian-400">
            Anonymous umbrella for craft-forward photography. All work under Nebular Labs licensing. No real-name attribution by design.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-obsidian-500">
            Select placeholder covers use Unsplash-licensed imagery with full attribution in per-photo metadata sidecars. A maximum of two series covers may be AI-generated and are disclosed as such in their metadata.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-obsidian-500">Work</p>
            <ul className="space-y-2 text-obsidian-300">
              <li><Link href="/galleries" className="hover:text-cyan-accent">Galleries</Link></li>
              <li><Link href="/series/vancouver-street" className="hover:text-cyan-accent">Series</Link></li>
              <li><Link href="/coach-mode" className="hover:text-cyan-accent">Coach mode</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-obsidian-500">Business</p>
            <ul className="space-y-2 text-obsidian-300">
              <li><Link href="/licensing" className="hover:text-cyan-accent">Licensing</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-accent">Pricing</Link></li>
              <li><Link href="/contact-waitlist" className="hover:text-cyan-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-obsidian-500">Legal</p>
            <ul className="space-y-2 text-obsidian-300">
              <li><Link href="/legal/privacy" className="hover:text-cyan-accent">Privacy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-cyan-accent">Terms</Link></li>
              <li><Link href="/legal/licensing-terms" className="hover:text-cyan-accent">License terms</Link></li>
              <li><Link href="/legal/accessibility" className="hover:text-cyan-accent">Accessibility</Link></li>
              <li><Link href="/rss.xml" className="hover:text-cyan-accent">RSS</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-obsidian-800 pt-6 text-xs text-obsidian-500">
        <p>Nebular Labs &middot; {year} &middot; All rights reserved. Portfolio operated under the Nebular Labs umbrella. Image rights held by respective source credits where attributed.</p>
      </div>
    </footer>
  );
}
