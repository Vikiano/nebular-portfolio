import Link from "next/link";
import Image from "next/image";
import { galleries, series, photoById } from "@/lib/photos";

export default function HomePage() {
  const featured = galleries.slice(0, 4);
  const seriesFeatured = series.slice(0, 3);
  return (
    <div className="bg-obsidian-950 text-obsidian-50">
      <section className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Nebular Labs Portfolio</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-obsidian-50 md:text-6xl">
            Craft photography, patient frames, obsidian light.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-obsidian-300">
            A portfolio of street, waterfront, documentary, portrait, and craft work from Nebular Labs. Each series is built slowly, over seasons, with intention. Licensing is direct; no brokers, no stock pools.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/galleries"
              className="inline-flex items-center justify-center rounded border border-cyan-accent bg-cyan-accent px-5 py-3 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-cyan-accent"
            >
              View galleries
            </Link>
            <Link
              href="/licensing"
              className="inline-flex items-center justify-center rounded border border-obsidian-600 px-5 py-3 text-sm font-semibold text-obsidian-100 transition hover:border-warm-400 hover:text-warm-300"
            >
              Licensing inquiry
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-obsidian-800 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-obsidian-500">Featured galleries</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian-50">Recent work</h2>
            </div>
            <Link href="/galleries" className="text-sm text-cyan-accent hover:underline">
              All galleries
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((gallery) => {
              const cover = photoById(gallery.cover_photo_id);
              return (
                <Link
                  key={gallery.slug}
                  href={`/galleries/${gallery.slug}`}
                  className="group block overflow-hidden rounded border border-obsidian-800 bg-obsidian-900 transition hover:border-cyan-accent"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-obsidian-800">
                    {cover ? (
                      <Image
                        src={cover.file_path}
                        alt={cover.alt_text}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                        priority={gallery.order_index === 1}
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-obsidian-50 group-hover:text-cyan-accent">
                      {gallery.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-obsidian-400">{gallery.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-obsidian-800 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-obsidian-500">Series in progress</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian-50">Long-form projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {seriesFeatured.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="group block rounded border border-obsidian-800 bg-obsidian-900 p-6 transition hover:border-warm-400"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-300">{s.theme_tag}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-obsidian-50 group-hover:text-warm-300">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-obsidian-400">{s.description}</p>
                {s.status === "expanding" ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-warm-400">Expanding 2026-Q2</p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-obsidian-800 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl rounded border border-obsidian-800 bg-obsidian-900 p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-accent">Licensing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-obsidian-50">
            Commercial use, editorial use, personal prints.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-obsidian-300">
            Direct licensing through Nebular Labs. No broker, no stock pool. Commercial and editorial licenses issued per-photo with clear usage terms. Personal prints available on waitlist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded border border-warm-500 bg-warm-500 px-5 py-3 text-sm font-semibold text-obsidian-950 transition hover:bg-transparent hover:text-warm-300"
            >
              View pricing
            </Link>
            <Link
              href="/contact-waitlist"
              className="inline-flex items-center justify-center rounded border border-obsidian-600 px-5 py-3 text-sm font-semibold text-obsidian-100 transition hover:border-cyan-accent hover:text-cyan-accent"
            >
              Submit an inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
