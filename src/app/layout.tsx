import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const garamond = EB_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madlen - Your Fashion Destination",
  description:
    "Discover the latest trends in fashion at Madlen. Shop our curated collection of clothing and accessories.",
  keywords: ["fashion", "clothing", "accessories", "online shopping"],
  authors: [{ name: "Madlen" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={garamond.className}>
      <body className={cn("min-h-screen flex flex-col bg-white ")}>
        <Header />
        <main className="mx-auto max-w-8xl">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
