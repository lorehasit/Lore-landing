import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "#faf9f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10.4" stroke="#fc9117" strokeWidth="1.7" />
            <path
              d="M12 4.4v15.2M5.4 7.9l13.2 8.2M18.6 7.9L5.4 16.1"
              stroke="#fc9117"
              strokeWidth="1.25"
            />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#1c1c1c" }}>Lore</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 600,
            color: "#1c1c1c",
            textAlign: "center",
            maxWidth: 880,
            lineHeight: 1.2,
          }}
        >
          <span>Your engineering decisions,&nbsp;</span>
          <span style={{ color: "#e97e06" }}>remembered.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
