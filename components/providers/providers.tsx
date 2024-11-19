import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import React from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
        </SessionProvider>
    );
};