import { ImageResponse } from "next/og";
import { galleryBySlug } from "@/lib/photos";

export const runtime = "edge";
export const alt = "Nebular Labs gallery preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GalleryOg({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = galleryBySlug(slug);
  const title = g?.title ?? "Gallery";
  const description = g?.description ?? "Nebular Labs gallery";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #05070d 0%, #0b0f1a 60%, #1e293b 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 96px",
          color: "#f1f5f9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#fb923c", textTransform: "uppercase" }}>Nebular Labs Gallery</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 68, fontWeight: 600, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 22, color: "#94a3b8", fontFamily: "system-ui", maxWidth: 960 }}>{description}</div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 18, color: "#22d3ee", fontFamily: "system-ui" }}>portfolio.nebular.art/galleries/{slug}</div>
      </div>
    ),
    { ...size },
  );
}
