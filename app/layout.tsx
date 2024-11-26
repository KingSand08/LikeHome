import { Providers } from "@/components/providers/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      <body className="min-h-screen flex flex-col bg-base-100 dark:bg-slate-800">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>{" "}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
