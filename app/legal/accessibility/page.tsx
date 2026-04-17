import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility commitment for the Nebular Labs portfolio.",
};

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-obsidian-200">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Accessibility</h1>
        <p className="mt-2 text-sm text-obsidian-400">Last reviewed 2026-04-17.</p>
      </header>
      <div className="space-y-5 text-base leading-relaxed">
        <h2 className="font-display text-2xl font-semibold text-obsidian-50">Commitment</h2>
        <p className="text-obsidian-300">Nebular Labs commits to WCAG 2.1 AA compliance as a baseline. The portfolio is audited on every deploy via automated accessibility checks (axe) and keyboard-only manual passes through the primary flows: navigation, gallery browsing, lightbox interaction, and the licensing inquiry form.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">What is implemented</h2>
        <ul className="ml-6 list-disc space-y-2 text-obsidian-300">
          <li>Keyboard-operable nav, gallery grid, and lightbox with arrow-key, Escape, and Tab support.</li>
          <li>Focus-visible styling on every interactive element.</li>
          <li>Descriptive alternative text on every photograph, stored alongside its metadata.</li>
          <li>Respect for prefers-reduced-motion.</li>
          <li>Dark-default with light mode toggle and persistent preference.</li>
          <li>Colour contrast meeting 4.5:1 for text and 3:1 for large text.</li>
          <li>Semantic landmarks (header, main, footer) and logical heading hierarchy.</li>
        </ul>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Known gaps</h2>
        <p className="text-obsidian-300">The lightbox component is a third-party library; minor focus-return glitches may occur during rapid keyboard navigation. These are tracked in the accessibility ticket queue.</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-obsidian-50">Report an issue</h2>
        <p className="text-obsidian-300">Email hello@nebular.art with a description of the issue and, if possible, the page URL and your assistive technology. Response within five business days.</p>
      </div>
    </article>
  );
}
