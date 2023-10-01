import { PropsWithChildren } from "react"
import AddressProvider from "../contexts/AddressProvider"
import StreetCrimesProvider from "../contexts/StreetCrimesProvider"

const AppContextProvider = ({children} : PropsWithChildren) => {
  return (
    <>
      <AddressProvider>
        <StreetCrimesProvider>
          {children}
        </StreetCrimesProvider>
      </AddressProvider>
    </>
  )
}

export default AppContextProvider