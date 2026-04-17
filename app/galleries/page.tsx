import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { galleries, photoById } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Galleries",
  description: "All Nebular Labs photography galleries: street, waterfront, documentary, portrait, craft fieldwork, quiet interiors.",
};

export default function GalleriesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Galleries</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-obsidian-50">Complete catalogue</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-obsidian-300">
          Each gallery is a curated window into a theme. Most are ongoing. Click through for per-photo frames, EXIF, and licensing information.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((g) => {
          const cover = photoById(g.cover_photo_id);
          return (
            <Link
              key={g.slug}
              href={`/galleries/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded border border-obsidian-800 bg-obsidian-900 transition hover:border-cyan-accent"
            >
              <div className="relative aspect-[3/2] bg-obsidian-800">
                {cover ? (
                  <Image
                    src={cover.file_path}
                    alt={cover.alt_text}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-semibold text-obsidian-50 group-hover:text-cyan-accent">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-obsidian-400">{g.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-obsidian-500">Published {new Date(g.published_at).toLocaleDateString("en-CA", { month: "short", year: "numeric" })}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
