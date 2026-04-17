"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
};

export function GalleryLightbox({ photos }: Props) {
  const [index, setIndex] = useState<number>(-1);
  const [showExif, setShowExif] = useState(false);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(-1), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (index === -1) return;
      if (e.key === "i" || e.key === "I") {
        setShowExif((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const slides = photos.map((p) => ({
    src: p.file_path,
    alt: p.alt_text,
    width: p.width,
    height: p.height,
    description: p.caption,
  }));

  const current = index >= 0 ? photos[index] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {photos.map((p, i) => (
          <li key={p.slug} className="group relative">
            <button
              type="button"
              onClick={() => open(i)}
              className="block w-full overflow-hidden rounded border border-obsidian-800 bg-obsidian-900 transition hover:border-cyan-accent focus-visible:border-cyan-accent"
              aria-label={`Open ${p.title} in lightbox`}
            >
              <span className="relative block aspect-[3/2] bg-obsidian-800">
                <Image
                  src={p.file_path}
                  alt={p.alt_text}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </span>
              <span className="block p-3 text-left">
                <span className="block font-display text-sm font-semibold text-obsidian-50 group-hover:text-cyan-accent">{p.title}</span>
                <span className="mt-1 block text-xs text-obsidian-400">{p.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        close={close}
        index={Math.max(0, index)}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(5, 7, 13, 0.95)" } }}
        render={{
          slideFooter: () =>
            current ? (
              <div className="mx-auto max-w-4xl px-4 py-3 text-xs text-obsidian-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-obsidian-50">{current.title}</p>
                  <button
                    type="button"
                    onClick={() => setShowExif((v) => !v)}
                    className="rounded border border-obsidian-600 px-2 py-1 text-obsidian-200 transition hover:border-cyan-accent hover:text-cyan-accent"
                  >
                    {showExif ? "Hide technical details" : "Show technical details (i)"}
                  </button>
                </div>
                {showExif ? (
                  <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-obsidian-400 md:grid-cols-4">
                    <div><dt className="text-obsidian-500">Camera</dt><dd>{current.camera ?? "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Lens</dt><dd>{current.lens ?? "--"}</dd></div>
                    <div><dt className="text-obsidian-500">ISO</dt><dd>{current.iso ?? "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Aperture</dt><dd>{current.aperture ?? "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Shutter</dt><dd>{current.shutter ?? "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Focal length</dt><dd>{current.focal_length_mm ? `${current.focal_length_mm}mm` : "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Captured</dt><dd>{current.captured_at ? new Date(current.captured_at).toLocaleDateString("en-CA") : "--"}</dd></div>
                    <div><dt className="text-obsidian-500">Source</dt><dd className="capitalize">{current.attribution_source.replace("-", " ")}</dd></div>
                  </dl>
                ) : null}
                {current.exif_synthesized ? (
                  <p className="mt-2 text-[11px] text-obsidian-500">EXIF values shown for placeholder cover are representative and flagged as synthesized. Real frames carry authentic EXIF.</p>
                ) : null}
                {current.attribution_photographer && current.attribution_url ? (
                  <p className="mt-2 text-[11px] text-obsidian-500">
                    Cover image attribution: <a href={current.attribution_url} rel="noopener noreferrer" target="_blank" className="underline hover:text-cyan-accent">{current.attribution_photographer}</a> via Unsplash License.
                  </p>
                ) : null}
              </div>
            ) : null,
        }}
      />
    </>
  );
}
