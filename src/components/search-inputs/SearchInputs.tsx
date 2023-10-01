import { useContext, useState } from 'react'
import { policeApiService } from '../../IoC/serviceProvider';
import { AddressContext } from '../../contexts/AddressProvider';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';

const SearchInputs = () => {
  const {defaultAddress, setAddress} = useContext(AddressContext);
  const {setStreetCrimes} = useContext(StreetCrimesContext);
  const [tempAddress, setTempAddress] = useState<string>(defaultAddress);

  const handleClick = async () => {
    setAddress(tempAddress);
    const [lat, lon] = tempAddress.split(',').map(x => parseFloat(x.trim()));
    const coordinate: [number, number]= [lat, lon];
    const res = await policeApiService.getStreetCrimesAroundCoordinate(coordinate, 1000, '2023-05');
    setStreetCrimes(res);
    console.log(res);
  }

  return (
    <>
      <input type="text" id='addressField' data-testid="address" value={tempAddress} onChange={(e) =>{setTempAddress(e.target.value)}}/>
      <div id='searchButton' data-testid="searchButton" onClick={handleClick}>Search</div>
    </>
  )
}

export default SearchInputs