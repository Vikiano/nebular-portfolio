import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nebular Labs Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          padding: "80px 96px",
          color: "#f1f5f9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#22d3ee", textTransform: "uppercase" }}>Nebular Labs</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 72, fontWeight: 600, lineHeight: 1.1 }}>Craft photography, patient frames, obsidian light.</div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 24, color: "#94a3b8", fontFamily: "system-ui" }}>portfolio.nebular.art</div>
      </div>
    ),
    { ...size },
  );
}
