import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rooted — Growth, delivered.",
  description:
    "Clinically proven mobile hair restoration — LLLT, PRP, microneedling and supplements delivered to your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-ink bg-white`}>
        {children}
      </body>
    </html>
  );
}
