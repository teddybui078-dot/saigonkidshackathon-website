import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { EVENT, AGES } from "@/components/event";

const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dynapuff",
});

export const metadata: Metadata = {
  title: EVENT.name,
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
        {children}
      </body>
    </html>
  );
}
