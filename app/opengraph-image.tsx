import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/site/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0d0d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7a94ab",
          }}
        >
          {site.philosophy}
        </div>
        <div style={{ display: "flex", fontSize: 168, fontWeight: 700, marginTop: 28, lineHeight: 1 }}>
          {hero.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9a9a9a", marginTop: 20 }}>
          {hero.roles.join("   ·   ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
