import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dynapuff",
});

export const metadata: Metadata = {
  title: "Saigon Kids Hackathon",
  description:
    "One big day of building, coding, and playing — 130 young makers, March 6, 2027, Ho Chi Minh City.",
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Saigon Kids Hackathon",
    description:
      "One big day of building, coding, and playing — March 6, 2027, Ho Chi Minh City.",
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
