import { Providers } from "@/components/providers/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


//const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LikeHome",
// };

export default function RootLayout({ children }:{ children: React.ReactNode; }) {
  return (
    <html lang="en">
      <Navbar />
      <body>
        {children}
      </body>
      <Footer />
    </html>
  );
}
