import { ImageResponse } from "next/og";

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
          background: "#0b0a09",
          color: "#f3efe6",
        }}
      >
        <div style={{ fontSize: 104, fontFamily: "serif" }}>Parallel</div>
        <div
          style={{
            fontSize: 28,
            color: "#a49b8a",
            marginTop: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Best viewed on mobile
        </div>
      </div>
    ),
    { ...size },
  );
}
