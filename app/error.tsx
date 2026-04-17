"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[portfolio] render error", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-300">Render error</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-obsidian-50">A frame failed to develop.</h1>
      <p className="mt-4 text-sm leading-relaxed text-obsidian-300">Something went wrong rendering this page. You can retry or return to the galleries.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={() => reset()} className="inline-flex items-center justify-center rounded border border-cyan-accent bg-cyan-accent px-5 py-2 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-cyan-accent">
          Retry
        </button>
        <Link href="/galleries" className="inline-flex items-center justify-center rounded border border-obsidian-600 px-5 py-2 text-sm text-obsidian-200 transition hover:border-warm-400 hover:text-warm-300">
          Back to galleries
        </Link>
      </div>
      {error.digest ? <p className="mt-6 text-xs text-obsidian-500">digest: {error.digest}</p> : null}
    </div>
  );
}
