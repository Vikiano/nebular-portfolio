import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coach Mode",
  description: "Photography coaching from Nebular Labs. One-on-one and small-group sessions on seeing, composition, and disciplined editing.",
};

export default function CoachModePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-300">Coach mode</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Patient feedback on your work.</h1>
        <p className="mt-4 text-base leading-relaxed text-obsidian-300">
          Coach Mode is a small programme for photographers who want honest, slow feedback on their frames. No grading, no rankings, no live-walk exercises. Just a pair of eyes that is trained on the work and paid to be honest about it.
        </p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-obsidian-300">
        <p>
          Each session is 45 minutes over a shared screen. You bring ten to twenty frames from the last month. Nebular Labs walks through each frame with you on composition, intent, and edit choice. You leave with three recommendations for the next thirty days.
        </p>
        <p>
          Coach Mode does not read your exam, take your test, or act as an undisclosed ghost in a live assessment. It is feedback on finished or in-progress work, disclosed, by appointment.
        </p>
        <p>
          The waitlist opens in 2026-Q2. Pricing will be $120-$200 CAD per 45-minute session, $400 CAD for a four-session programme.
        </p>
        <div>
          <Link href="/contact-waitlist" className="inline-flex items-center justify-center rounded border border-warm-400 px-5 py-2 text-sm font-semibold text-warm-300 transition hover:bg-warm-500 hover:text-obsidian-950">
            Join the waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
