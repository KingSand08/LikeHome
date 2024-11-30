"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HeaderFooterWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    
    const excludeHeaderFooter = pathname === "/landing" || pathname.startsWith("/landing/");

    console.log("Current Pathname:", pathname);
    console.log("Exclude Header/Footer:", excludeHeaderFooter);

    return (
        <>
            {!excludeHeaderFooter && <Header />}
            <main className="flex-grow">{children}</main>
            {!excludeHeaderFooter && <Footer />}
        </>
    );
}