import React, { PropsWithChildren, createContext, useState } from 'react'

export const AddressContext = createContext<{
  defaultAddress: string, 
  address: string; 
  setAddress: React.Dispatch<React.SetStateAction<string>>
}>(undefined as any);

const AddressProvider = ({children} : PropsWithChildren) => {
  const defaultAddress = '53.483959, -2.244644';
  const [address, setAddress] = useState<string>(defaultAddress);
  
  return (
    <AddressContext.Provider value={{defaultAddress, address, setAddress}}>
      {children}
    </AddressContext.Provider>
  )
}

export default AddressProvider