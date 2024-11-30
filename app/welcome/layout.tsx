import { ReactNode } from "react";

export default function WelcomeLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <div className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-800">
        {/* No Header and Footer here */}
        <main className="flex-grow">{children}</main>
        </div>
    );
    }