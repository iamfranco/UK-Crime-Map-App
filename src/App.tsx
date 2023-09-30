import { useState } from 'react'
import './App.css'
import { policeApiService } from './IoC/serviceProvider';
import { Coordinate } from './models/Coordinate';

function App() {
  const [address, setAddress] = useState<string>('53.483959, -2.244644');

  const handleClick = async () => {
    const [lat, lon] = address.split(',').map(x => parseFloat(x.trim()));
    const coordinate: Coordinate = {lat: lat, lon: lon};
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

export default App
