import { Providers } from "@/components/providers/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeaderFooterWrapper from "@/components/layout/HeaderFooterWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LikeHome",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-800">
        <Providers>
          <HeaderFooterWrapper>
          <main className="flex-grow">{children}</main>{" "}
          {/* Main content takes up remaining space */}
          </HeaderFooterWrapper>
        </Providers>
      </body>
    </html>
  );
}
