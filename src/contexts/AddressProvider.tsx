import React, { PropsWithChildren, createContext, useState } from 'react'

export const AddressContext = createContext<{address: string; setAddress: React.Dispatch<React.SetStateAction<string>>}>(undefined as any);

const AddressProvider = (props : PropsWithChildren) => {
  const [address, setAddress] = useState<string>('53.483959, -2.244644');
  
  return (
    <AddressContext.Provider value={{address, setAddress}}>
      {props.children}
    </AddressContext.Provider>
  )
}

export default AddressProvider