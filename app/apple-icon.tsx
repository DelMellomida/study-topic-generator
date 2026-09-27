import {ImageResponse} from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#171312",
          color: "#f7efe7",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 112,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          lineHeight: 1,
          width: "100%",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
