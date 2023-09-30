import './App.css'
import { coordinateConversionService } from './IoC/serviceProvider';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AddressProvider from './contexts/AddressProvider';
import SearchInputs from './components/search-inputs/SearchInputs';

function App() {
  const position: [number, number] = [53.483959, -2.244644];

  const polygon: [number, number][] = coordinateConversionService
    .getBoundingSquareLatLonPolygon(position, 1000);
  
  const purpleOptions = { color: 'purple' };

  return (
    <AddressProvider>
      <SearchInputs />

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
    </AddressProvider>
  )
}

export default App
