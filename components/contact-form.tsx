"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/licensing-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(body?.error ?? "Submission failed. Please email hello@nebular.art instead.");
        return;
      }

      setStatus("success");
      setMessage(body?.degraded ? "Recorded locally. Nebular Labs will sync and respond within five business days." : "Received. Nebular Labs will respond within five business days.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please email hello@nebular.art instead.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded border border-obsidian-800 bg-obsidian-900 p-6">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-obsidian-100">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="block w-full rounded border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-sm text-obsidian-50 focus:border-cyan-accent focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="inquiry_type" className="mb-1 block text-sm font-medium text-obsidian-100">Inquiry type</label>
        <select
          id="inquiry_type"
          name="inquiry_type"
          required
          defaultValue="commercial"
          className="block w-full rounded border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-sm text-obsidian-50 focus:border-cyan-accent focus:outline-none"
        >
          <option value="commercial">Commercial license</option>
          <option value="editorial">Editorial license</option>
          <option value="personal">Personal print</option>
          <option value="commission">Commission request</option>
          <option value="coach">Coach mode waitlist</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="budget_tier" className="mb-1 block text-sm font-medium text-obsidian-100">Budget tier (optional)</label>
        <select
          id="budget_tier"
          name="budget_tier"
          defaultValue=""
          className="block w-full rounded border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-sm text-obsidian-50 focus:border-cyan-accent focus:outline-none"
        >
          <option value="">Prefer not to say</option>
          <option value="under-500">Under $500 CAD</option>
          <option value="500-2500">$500-$2,500 CAD</option>
          <option value="2500-10000">$2,500-$10,000 CAD</option>
          <option value="10000-plus">$10,000+ CAD</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-obsidian-100">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="block w-full rounded border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-sm text-obsidian-50 focus:border-cyan-accent focus:outline-none"
          placeholder="Describe the intended use, territory, duration, and any frames you are considering."
        />
      </div>
      <input type="text" name="honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded border border-cyan-accent bg-cyan-accent px-5 py-3 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-cyan-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit inquiry"}
      </button>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "success" ? <span className="text-cyan-accent">{message}</span> : null}
        {status === "error" ? <span className="text-warm-400">{message}</span> : null}
      </p>
    </form>
  );
}
