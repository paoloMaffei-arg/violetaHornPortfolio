import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const runtime = "nodejs";
export const alt = "Violeta Horn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [fontData, imgData] = await Promise.all([
    readFile(fileURLToPath(new URL("./Fraunces.woff", import.meta.url))),
    readFile(fileURLToPath(new URL("./og-bg.jpg", import.meta.url))),
  ]);

  const imgSrc = `data:image/jpeg;base64,${imgData.toString("base64")}`;
  const label =
    locale === "en" ? "Actress · Buenos Aires" : "Actriz · Buenos Aires";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 78%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            background:
              "linear-gradient(0deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.62) 26%, rgba(10,10,10,0) 56%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 66,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 25,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "#f4f2ee",
              opacity: 0.82,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 300,
              fontSize: 132,
              lineHeight: 1,
              color: "#f4f2ee",
              marginTop: 14,
            }}
          >
            Violeta Horn
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fontData, weight: 300, style: "normal" },
      ],
    },
  );
}
