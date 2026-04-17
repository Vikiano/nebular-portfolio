import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact and waitlist",
  description: "Submit a licensing inquiry or join the Nebular Labs waitlist. Response within five business days.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Contact &middot; waitlist</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Tell Nebular Labs about the work.</h1>
        <p className="mt-4 text-base leading-relaxed text-obsidian-300">
          Use this form for licensing inquiries, commission requests, coach mode waitlist, or a general introduction. No form response means the form failed quietly; in that case email <span className="text-cyan-accent">hello@nebular.art</span> instead.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
