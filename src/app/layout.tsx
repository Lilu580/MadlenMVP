import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { HeaderMainSearch } from "@/components/layout/HeaderMainSearch";
import { Providers } from "@/components/providers";
import { headers } from "next/headers";
import { getSettings } from "@/lib/settings";

const garamond = EB_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const indexing = s.seo_indexing === "true";
  return {
    title: s.seo_title,
    description: s.seo_description,
    keywords: s.seo_keywords ? s.seo_keywords.split(",").map((k) => k.trim()) : [],
    robots: indexing ? "index, follow" : "noindex, nofollow",
    openGraph: {
      title: s.seo_title,
      description: s.seo_description,
      ...(s.seo_og_image ? { images: [s.seo_og_image] } : {}),
    },
  };
}

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
