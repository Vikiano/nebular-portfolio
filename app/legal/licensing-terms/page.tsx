import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License terms",
  description: "Standard licensing framework for Nebular Labs photography.",
};

export default function LicensingTermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-obsidian-200">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">License terms</h1>
        <p className="mt-2 text-sm text-obsidian-400">Last reviewed 2026-04-17. This page is an outline. The actual license attached to each inquiry is a separate, signed agreement.</p>
      </header>
      <div className="space-y-5 text-base leading-relaxed">
        <h2 className="font-display text-2xl font-semibold text-obsidian-50">What is granted</h2>
        <p className="text-obsidian-300">Nebular Labs grants the licensee a non-exclusive (or exclusive, per agreement) right to reproduce the specified photograph in the specified media, territories, and duration identified in the written license.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">What is not granted</h2>
        <ul className="ml-6 list-disc space-y-2 text-obsidian-300">
          <li>The right to sublicense, resell, or transfer the license to a third party without prior written consent.</li>
          <li>The right to use the photograph to train machine-learning models, generative systems, or classifier systems.</li>
          <li>The right to use the photograph in any manner that defames, misrepresents, or infringes the rights of the subject.</li>
          <li>The right to claim authorship of the photograph.</li>
        </ul>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Attribution</h2>
        <p className="text-obsidian-300">Editorial licenses require attribution in the form: "Photograph by Nebular Labs, used under license." Commercial licenses may waive attribution on agreement.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Fees and term</h2>
        <p className="text-obsidian-300">Fees are set per inquiry. Term typically twelve months from delivery, renewable. Late payment accrues interest at 1.5 percent per month or the maximum rate permitted by law.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Termination</h2>
        <p className="text-obsidian-300">Nebular Labs may terminate the license for material breach upon written notice. Immediate takedown of all uses follows termination.</p>
      </div>
    </article>
  );
}
