import Footer from "@/app/Footer";
import Header from "@/app/Header";
import { Providers } from "@/app/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
          <Header />
          <main className="flex-grow">{children}</main>{" "}
          {/* Main content takes up remaining space */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
