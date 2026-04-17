import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms of service for the Nebular Labs portfolio site.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-obsidian-200">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Terms of service</h1>
        <p className="mt-2 text-sm text-obsidian-400">Last reviewed 2026-04-17.</p>
      </header>
      <div className="space-y-5 text-base leading-relaxed">
        <h2 className="font-display text-2xl font-semibold text-obsidian-50">Using this site</h2>
        <p className="text-obsidian-300">By visiting portfolio.nebular.art you accept these terms. The site is an editorial portfolio for Nebular Labs. Content is presented for viewing, licensing inquiry, and research.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Intellectual property</h2>
        <p className="text-obsidian-300">All photographs are either made by Nebular Labs or used under a cited source license (Unsplash License for attributed placeholders, generative licenses for AI-generated covers where indicated). All rights reserved to their respective authors. Scraping, bulk-downloading, or redistributing this site is prohibited. AI model training on these photographs is prohibited unless explicitly granted.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">No warranty</h2>
        <p className="text-obsidian-300">The site and its content are provided without warranty of any kind. Nebular Labs is not liable for any damages arising from use of, or inability to use, the site.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Licensing of photographs</h2>
        <p className="text-obsidian-300">To use any photograph outside personal non-commercial viewing, a license is required. See the <a href="/legal/licensing-terms" className="text-cyan-accent hover:underline">license terms</a> page for the standard framework.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Governing law</h2>
        <p className="text-obsidian-300">These terms are governed by the laws of the Province of British Columbia, Canada, and the laws of Canada applicable therein.</p>
      </div>
    </article>
  );
}
