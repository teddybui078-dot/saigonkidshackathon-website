import type { Metadata, Viewport } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SceneBackdrop from "@/components/SceneBackdrop";
import SceneVeil from "@/components/SceneVeil";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import RouteScroll from "@/components/RouteScroll";
import { EVENT, AGES } from "@/components/event";

const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dynapuff",
});

export const metadata: Metadata = {
  title: { default: EVENT.name, template: `%s — ${EVENT.name}` },
  description: `One big day of building, coding, and playing — ${EVENT.spots} young makers aged ${AGES}, ${EVENT.date}, ${EVENT.city}.`,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: EVENT.name,
    description: `One big day of building, coding, and playing — ${EVENT.date}, ${EVENT.city}.`,
    images: ["/logo.png"],
  },
};

/* the browser chrome on phones matches the midnight sky */
export const viewport: Viewport = {
  themeColor: "#191970",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dynapuff.variable}>
      <body className="antialiased">
        <SmoothScroll />
        {/* the chrome every page shares: the sky, the progress bar, the nav */}
        <SceneBackdrop />
        <ScrollProgress />
        <Navbar />
        {children}
        {/* the chalk tooth over every page, under the nav */}
        <SceneVeil />
        {/* last, so it runs after every section has set up its triggers */}
        <RouteScroll />
      </body>
    </html>
  );
}
