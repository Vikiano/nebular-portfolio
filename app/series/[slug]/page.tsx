import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { series, seriesBySlug, photosForSeries } from "@/lib/photos";
import { GalleryLightbox } from "@/components/lightbox";

export async function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = seriesBySlug(slug);
  if (!s) return { title: "Series not found" };
  return {
    title: s.title,
    description: s.description,
    openGraph: {
      title: `${s.title} | Nebular Labs Portfolio`,
      description: s.description,
      type: "article",
    },
  };
}

export default async function SeriesDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = seriesBySlug(slug);
  if (!s) notFound();

  const photos = photosForSeries(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-obsidian-400">
        <Link href="/" className="hover:text-cyan-accent">Home</Link>
        <span aria-hidden className="mx-2">/</span>
        <span aria-current="page" className="text-obsidian-200">{s.title}</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-300">Series &middot; {s.theme_tag}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">{s.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-obsidian-300">{s.description}</p>
        {s.status === "expanding" && s.status_note ? (
          <p className="mt-4 inline-block rounded border border-warm-500/40 bg-warm-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-warm-300">
            {s.status_note}
          </p>
        ) : null}
      </header>

      {photos.length > 0 ? (
        <GalleryLightbox photos={photos} />
      ) : (
        <p className="rounded border border-obsidian-700 bg-obsidian-900 p-6 text-sm text-obsidian-300">
          First frames publishing soon. Expected expansion 2026-Q2.
        </p>
      )}
    </div>
  );
}
