"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

export type RegionContextType = { region_id: string; name: string } | undefined;

export const RegionContext = createContext<
  [
    RegionContextType,
    React.Dispatch<React.SetStateAction<RegionContextType | undefined>>
  ]
>([undefined, () => {}]);

const RegionProvider = ({ children }: { children: ReactNode }) => {
  const getInitialRegion = (): RegionContextType => {
    const storedRegion = localStorage.getItem("region");
    return storedRegion ? JSON.parse(storedRegion) : undefined;
  };

  const [region, setRegion] = useState<RegionContextType>(getInitialRegion);

  useEffect(() => {
    if (region) {
      localStorage.setItem("region", JSON.stringify(region));
    }
  }, [region]);

  return (
    <RegionContext.Provider value={[region, setRegion]}>
      {children}
    </RegionContext.Provider>
  );
};

export default RegionProvider;
