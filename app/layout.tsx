import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SceneBackdrop from "@/components/SceneBackdrop";
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
        {/* last, so it runs after every section has set up its triggers */}
        <RouteScroll />
      </body>
    </html>
  );
}
