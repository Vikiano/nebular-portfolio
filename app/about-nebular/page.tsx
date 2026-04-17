import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Nebular Labs",
  description: "Nebular Labs is the anonymous umbrella for craft photography, writing, and independent tooling. Built slowly, on purpose.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">About</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">The Nebular Labs umbrella</h1>
      </header>
      <div className="prose-invert space-y-6 text-base leading-relaxed text-obsidian-200">
        <p>
          Nebular Labs is an umbrella. It holds photography, writing, small tools, and longer projects that share a voice but not always a subject. The umbrella exists so the work gets to stand first, without a name steering interpretation.
        </p>
        <p>
          The portfolio you see here is one wing. There are others: a microstock programme being staged, a long-running encyclopedia of craft knowledge, a small set of indie products. Anything made under Nebular Labs carries the same rules: patient frames, honest metadata, consent-first portraits, direct licensing.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-obsidian-50">How the work is made</h2>
        <p>
          Cameras are small. Most frames are taken at 23mm or 35mm equivalent, on foot, in weather. The gear matters less than the walking. Colour and exposure decisions happen on location, not in post. Post-processing is limited to cropping, levels, and selective contrast. Frames that needed heavy rescue do not ship.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-obsidian-50">Why anonymous</h2>
        <p>
          The umbrella is anonymous for craft and for boundaries. Buyers license frames, not names. Subjects appear only with explicit release. The portfolio site does not scrape, track, or resell any visitor data, and its placeholder covers are either Unsplash-licensed, AI-generated, or (in coming releases) made directly by the Nebular Labs photographer. Attribution for every external asset is stored in the per-photo metadata sidecar.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-obsidian-50">Contact</h2>
        <p>
          Licensing and commission inquiries: <Link href="/contact-waitlist" className="text-cyan-accent hover:underline">contact form</Link>. Nebular Labs responds within five business days.
        </p>
      </div>
    </article>
  );
}
