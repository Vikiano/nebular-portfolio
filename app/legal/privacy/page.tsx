import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy for the Nebular Labs portfolio. Plain-language terms on what is collected, why, and how long it is kept.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-obsidian-200">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Privacy policy</h1>
        <p className="mt-2 text-sm text-obsidian-400">Last reviewed 2026-04-17.</p>
      </header>
      <div className="space-y-5 text-base leading-relaxed">
        <p>This policy covers the Nebular Labs portfolio site reachable at portfolio.nebular.art and associated Vercel previews. It is written in plain language on purpose.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">What the site collects</h2>
        <ul className="ml-6 list-disc space-y-2 text-obsidian-300">
          <li>Form submissions from the contact and licensing inquiry form: email address, inquiry type, budget tier, and the message you type. Stored in a Supabase database with row-level security.</li>
          <li>Standard web server logs (IP, user agent, timestamp, path) retained for fourteen days for security and debugging.</li>
          <li>No analytics scripts. No third-party trackers. No advertising tags.</li>
        </ul>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">How long data is kept</h2>
        <p className="text-obsidian-300">
          Contact submissions are retained for twenty-four months from last activity. You may request deletion at any time by emailing hello@nebular.art. Server logs roll off after fourteen days.
        </p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Who has access</h2>
        <p className="text-obsidian-300">
          Nebular Labs operates this site under a single account. Service providers include Vercel (hosting), Supabase (database), and optionally Resend (email delivery). Each provider processes data strictly as the storage and delivery layer. No data is sold or shared for marketing.
        </p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Cookies</h2>
        <p className="text-obsidian-300">
          A single cookie stores your theme preference (dark or light) in your browser. No tracking cookies. No consent banner is shown because there is nothing to consent to.
        </p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Contact</h2>
        <p className="text-obsidian-300">Data questions and deletion requests: hello@nebular.art.</p>
      </div>
    </article>
  );
}
