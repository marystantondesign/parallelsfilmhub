import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parallels",
    template: "%s",
  },
  description: "Screenplay, marketing site, and app design for Parallels — best viewed on mobile.",
  openGraph: {
    title: "Parallels",
    description: "Screenplay, marketing site, and app design for Parallels — best viewed on mobile.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f0e7d6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
