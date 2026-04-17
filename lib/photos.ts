import photosStatic from "@/data/photos-static.json";
import galleriesStatic from "@/data/galleries-static.json";
import seriesStatic from "@/data/series-static.json";

export type Photo = {
  id: string;
  slug: string;
  gallery_slug: string;
  series_slugs: string[];
  title: string;
  caption: string;
  alt_text: string;
  camera: string | null;
  lens: string | null;
  iso: number | null;
  aperture: string | null;
  shutter: string | null;
  focal_length_mm: number | null;
  captured_at: string | null;
  file_path: string;
  width: number;
  height: number;
  attribution_source: "self" | "unsplash" | "ai-generated";
  attribution_license: string;
  attribution_photographer: string | null;
  attribution_url: string | null;
  tags: string[];
  exif_synthesized: boolean;
};

export type Gallery = {
  slug: string;
  title: string;
  description: string;
  cover_photo_id: string;
  order_index: number;
  published_at: string;
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  theme_tag: string;
  cover_photo_id: string;
  photo_slugs: string[];
  status: "active" | "expanding";
  status_note: string | null;
};

export const photos = photosStatic as Photo[];
export const galleries = galleriesStatic as Gallery[];
export const series = seriesStatic as Series[];

export function photoBySlug(slug: string): Photo | undefined {
  return photos.find((p) => p.slug === slug);
}

export function photoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

export function galleryBySlug(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function seriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function photosForGallery(slug: string): Photo[] {
  return photos.filter((p) => p.gallery_slug === slug);
}

export function photosForSeries(slug: string): Photo[] {
  const srs = seriesBySlug(slug);
  if (!srs) return [];
  return srs.photo_slugs
    .map((ps) => photos.find((p) => p.slug === ps))
    .filter((p): p is Photo => Boolean(p));
}

export function allTags(): string[] {
  const set = new Set<string>();
  photos.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}
