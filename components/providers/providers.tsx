import { ThemeProvider } from 'next-themes';
import React from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    );
};
