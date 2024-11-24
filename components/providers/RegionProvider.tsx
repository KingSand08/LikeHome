import { createContext, ReactNode, useState } from "react";

export type RegionContextType = { region_id?: string; name?: string };

export const RegionContext = createContext<[RegionContextType, React.Dispatch<React.SetStateAction<RegionContextType>>]>([{}, () => {}]);

const RegionProvider = ({children}: {children: ReactNode}) => {
  const [region, setRegion] = useState({})

  return (
    <RegionContext.Provider value={[region, setRegion]}>
    {children}
    </RegionContext.Provider>
  )
}

export default RegionProvider