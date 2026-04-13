import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 20 L11 11 L11 13.5 L5 20 Z" />
          <path d="M7 20 L17 9 L17 11.5 L10.5 20 Z" />
          <path d="M12 20 L22 7 L22 9.5 L15 20 Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
