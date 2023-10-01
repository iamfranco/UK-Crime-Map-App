import { PropsWithChildren, createContext, useState } from "react";
import { StreetCrime } from "../clients/policeApiClient/models/StreetCrime";

export const StreetCrimesContext = createContext<{
  streetCrimes: StreetCrime[];
  setStreetCrimes: React.Dispatch<React.SetStateAction<StreetCrime[]>>;
}>(undefined as any);

const StreetCrimesProvider = ({children}: PropsWithChildren) => {
  const [streetCrimes, setStreetCrimes] = useState<StreetCrime[]>([]);

  return (
    <StreetCrimesContext.Provider value={{streetCrimes, setStreetCrimes}}>
      {children}
    </StreetCrimesContext.Provider>
  )
}

export default StreetCrimesProvider