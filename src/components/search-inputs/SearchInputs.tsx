import { useContext, useEffect, useState } from 'react'
import { coordinateConversionService, policeApiService } from '../../IoC/serviceProvider';
import { AddressContext } from '../../contexts/AddressProvider';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';

const SearchInputs = () => {
  const {defaultAddress, setAddress} = useContext(AddressContext);
  const {setStreetCrimes} = useContext(StreetCrimesContext);
  const [tempAddress, setTempAddress] = useState<string>(defaultAddress);

  const dates = [
    '2023-01', 
    '2023-02', 
    '2023-03', 
    '2023-04', 
    '2023-05', 
    '2023-06', 
    '2023-07'
  ];

  const fetchStreetCrimes = async (address: string) => {
    const coordinate = await coordinateConversionService.getLatLonFromAddress(address);
    const res = await policeApiService.getStreetCrimesAroundCoordinate(coordinate!, 1000, dates);
    setStreetCrimes(res);
  }

  const handleClick = async () => {
    setAddress(tempAddress);
    fetchStreetCrimes(tempAddress);
  }

  useEffect(() => {
    fetchStreetCrimes(defaultAddress);
  }, [])

  return (
    <>
      <input type="text" id='addressField' data-testid="address" value={tempAddress} onChange={(e) =>{setTempAddress(e.target.value)}}/>
      <div id='searchButton' data-testid="searchButton" onClick={handleClick}>Search</div>
    </>
  )
}

export default SearchInputs