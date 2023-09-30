import { useContext } from 'react'
import { policeApiService } from '../../IoC/serviceProvider';
import { AddressContext } from '../../contexts/AddressProvider';

const SearchInputs = () => {
  const {address, setAddress} = useContext(AddressContext);

  const handleClick = async () => {
    const [lat, lon] = address.split(',').map(x => parseFloat(x.trim()));
    const coordinate: [number, number]= [lat, lon];
    const res = await policeApiService.getStreetCrimesAroundCoordinate(coordinate, 1000, '2023-01');
    console.log(res);
  }

  return (
    <>
      <input type="text" id='addressField' data-testid="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <div id='searchButton' data-testid="searchButton" onClick={handleClick}>Search</div>
    </>
  )
}

export default SearchInputs