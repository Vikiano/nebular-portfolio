import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { galleries, galleryBySlug, photosForGallery } from "@/lib/photos";
import { GalleryLightbox } from "@/components/lightbox";

export async function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = galleryBySlug(slug);
  if (!g) return { title: "Gallery not found" };
  return {
    title: g.title,
    description: g.description,
    openGraph: {
      title: `${g.title} | Nebular Labs Portfolio`,
      description: g.description,
      type: "article",
    },
  };
}

export default async function GalleryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = galleryBySlug(slug);
  if (!gallery) notFound();

  const photos = photosForGallery(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-obsidian-400">
        <Link href="/galleries" className="hover:text-cyan-accent">All galleries</Link>
        <span aria-hidden className="mx-2">/</span>
        <span aria-current="page" className="text-obsidian-200">{gallery.title}</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Gallery</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">{gallery.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-obsidian-300">{gallery.description}</p>
      </header>

      {photos.length > 0 ? (
        <GalleryLightbox photos={photos} />
      ) : (
        <p className="rounded border border-obsidian-700 bg-obsidian-900 p-6 text-sm text-obsidian-300">
          This gallery is curating its first frames. Check back soon. Expected expansion 2026-Q2.
        </p>
      )}

      <section className="mt-16 rounded border border-obsidian-800 bg-obsidian-900 p-8">
        <h2 className="font-display text-xl font-semibold text-obsidian-50">License these frames</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-obsidian-400">
          Commercial, editorial, and personal licenses available for any frame in this gallery. Pricing and terms on the licensing pages.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/pricing" className="inline-flex items-center justify-center rounded border border-warm-500 bg-warm-500 px-4 py-2 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-warm-300">View pricing</Link>
          <Link href="/contact-waitlist" className="inline-flex items-center justify-center rounded border border-obsidian-600 px-4 py-2 text-sm text-obsidian-100 transition hover:border-cyan-accent hover:text-cyan-accent">Contact for quote</Link>
        </div>
      </section>
    </div>
  );
}
