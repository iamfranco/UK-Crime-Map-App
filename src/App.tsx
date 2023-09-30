import { useState } from 'react'
import './App.css'
import { coordinateConversionService, policeApiService } from './IoC/serviceProvider';
import { Coordinate } from './models/Coordinate';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [address, setAddress] = useState<string>('53.483959, -2.244644');

  const handleClick = async () => {
    const [lat, lon] = address.split(',').map(x => parseFloat(x.trim()));
    const coordinate: Coordinate = {lat: lat, lon: lon};
    const res = await policeApiService.getStreetCrimesAroundCoordinate(coordinate, 1000, '2023-01');
    console.log(res);
    
  }

  const position: [number, number] = [53.483959, -2.244644];

  const polygon: [number, number][] = coordinateConversionService
    .getBoundingSquareLatLonPolygon({lat: position[0], lon: position[1]}, 1000)
    .map(x => [x.lat, x.lon]);
  
  const purpleOptions = { color: 'purple' };

  return (
    <>
      <input type="text" id='addressField' data-testid="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <div id='searchButton' data-testid="searchButton" onClick={handleClick}>Search</div>
      
      <MapContainer center={position} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default App
