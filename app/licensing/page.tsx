import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Licensing",
  description: "Licensing terms for Nebular Labs photography. Commercial, editorial, and personal licenses available per frame.",
};

export default function LicensingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Licensing</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Direct licenses, clear terms.</h1>
        <p className="mt-4 text-base leading-relaxed text-obsidian-300">
          Every frame in this portfolio is available for direct license through Nebular Labs. No broker, no stock pool, no micropayment layer. Each license is issued per-photo, per-use, with written terms.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded border border-obsidian-800 bg-obsidian-900 p-6">
          <h2 className="font-display text-xl font-semibold text-obsidian-50">Commercial</h2>
          <p className="mt-2 text-sm leading-relaxed text-obsidian-300">
            Advertising, product packaging, corporate marketing, paid social. Includes a defined territory, duration, and placement rider. Exclusivity negotiable.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-obsidian-500">Waitlist tier &middot; quote on request</p>
        </article>
        <article className="rounded border border-obsidian-800 bg-obsidian-900 p-6">
          <h2 className="font-display text-xl font-semibold text-obsidian-50">Editorial</h2>
          <p className="mt-2 text-sm leading-relaxed text-obsidian-300">
            News, magazines, blogs, book covers for non-advertising journalistic use. Single-use or multi-use, attribution required.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-obsidian-500">Waitlist tier &middot; quote on request</p>
        </article>
        <article className="rounded border border-obsidian-800 bg-obsidian-900 p-6">
          <h2 className="font-display text-xl font-semibold text-obsidian-50">Personal</h2>
          <p className="mt-2 text-sm leading-relaxed text-obsidian-300">
            Signed prints for private display, limited runs per frame. A5, A3, and A2 print sizes available when the print queue opens.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-obsidian-500">Waitlist tier &middot; print queue opens 2026-Q3</p>
        </article>
      </section>

      <section className="mt-12 space-y-6 text-sm leading-relaxed text-obsidian-300">
        <h2 className="font-display text-2xl font-semibold text-obsidian-50">How the process works</h2>
        <ol className="ml-6 list-decimal space-y-3">
          <li>Submit an inquiry through the <Link href="/contact-waitlist" className="text-cyan-accent hover:underline">contact form</Link>. Include intended use, territory, duration, and format.</li>
          <li>Nebular Labs replies within five business days with a proposed license and quote.</li>
          <li>On agreement, a short license agreement is issued. No retainer, no subscription.</li>
          <li>Files are delivered as full-resolution TIFF or high-quality JPEG with embedded IPTC metadata.</li>
          <li>Revocation terms, renewal windows, and attribution requirements are in the agreement itself. See <Link href="/legal/licensing-terms" className="text-cyan-accent hover:underline">license terms</Link> for the standard framework.</li>
        </ol>

        <h2 className="font-display text-2xl font-semibold text-obsidian-50">What is not licensed</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>AI model training datasets. No frame in this portfolio may be used to train generative or discriminative models without a bespoke agreement.</li>
          <li>Derivative works where a subject is misrepresented, defamed, or used outside the context in which they consented to be photographed.</li>
          <li>Unattributed redistribution of any kind.</li>
        </ul>
      </section>
    </div>
  );
}
