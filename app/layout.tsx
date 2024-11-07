import { Providers } from "@/components/providers/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBox from "@/components/layout/SearchBox";

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
      <body className="min-h-screen flex flex-col bg-base-100">
        <Providers>
          <Header />
          {/* SearchBox positioned under the Header */}
          <div className="flex justify-center py-4 bg-base-100 shadow">
            <div className="container mx-auto px-4">
              <SearchBox />
            </div>
          </div>
          <main className="flex-grow">{children}</main>{" "}
          {/* Main content takes up remaining space */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
