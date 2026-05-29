import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { HeaderMainSearch } from "@/components/layout/HeaderMainSearch";
import { Providers } from "@/components/providers";
import { headers } from "next/headers";

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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning className={garamond.className}>
      <body className={cn("min-h-screen flex flex-col bg-white")}>
        <Providers>
          {isAdmin ? (
            children
          ) : (
            <>
              <HeaderMainSearch>{children}</HeaderMainSearch>
              <Footer />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
