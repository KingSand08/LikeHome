import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import React from "react";
import RegionProvider from "./RegionProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <RegionProvider>{children}</RegionProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
