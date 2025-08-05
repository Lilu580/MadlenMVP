import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ModalProvider } from "@/providers/Modal";
import ModalRenderer from "@/components/layout/Modal/ModalRender";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madlen - Your Fashion Destination",
  description: "Discover the latest trends in fashion at Madlen. Shop our curated collection of clothing and accessories.",
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
    <html lang="en" suppressHydrationWarning>
      <body className="font-['EB_Garamond',serif] min-h-screen flex flex-col text-sm">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModalProvider>
           <ModalRenderer />
            <div className="flex-grow">
              <Header />
              <main className="container mt-32 mx-auto px-4 py-8 max-w-[1440px]">
                {children}
              </main>
            </div>
            <Footer />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
