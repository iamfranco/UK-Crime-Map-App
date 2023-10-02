import React, { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { coordinateConversionService } from '../IoC/serviceProvider';

export const AddressContext = createContext<{
  defaultAddress: string, 
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  coordinate: [number, number],
}>(undefined as any);

const AddressProvider = ({children} : PropsWithChildren) => {
  const defaultAddress = 'M2 5PD';
  const [address, setAddress] = useState<string>(defaultAddress);
  const [coordinate, setCoordinate] = useState<[number, number]>([0, 0]);
  
  useEffect(() => {
    async function fetchCoordinate() {
      const res = await coordinateConversionService.getLatLonFromAddress(address);
      if (res == null) return;

      setCoordinate(res);
    }
    fetchCoordinate()
  }, [address])
  
  return (
    <AddressContext.Provider value={{defaultAddress, address, setAddress, coordinate}}>
      {children}
    </AddressContext.Provider>
  )
}

export default AddressProvider