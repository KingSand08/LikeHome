"use client";
import { createContext, ReactNode, useState } from "react";

export type RegionContextType = { region_id: string; name: string } | undefined;

export const RegionContext = createContext<
  [
    RegionContextType,
    React.Dispatch<React.SetStateAction<RegionContextType | undefined>>
  ]
>([undefined, () => {}]);

const RegionProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState<RegionContextType | undefined>();

  return (
    <RegionContext.Provider value={[region, setRegion]}>
      {children}
    </RegionContext.Provider>
  );
};

export default RegionProvider;
