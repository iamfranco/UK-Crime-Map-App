import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import { coordinateConversionService } from '../../IoC/serviceProvider';
import { useContext, useEffect } from 'react';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';
import { AddressContext } from '../../contexts/AddressProvider';
import './MapViewer.css'

const MapViewer = () => {
  const {address} = useContext(AddressContext);
  const position = addressToPosition(address);

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
      <MapAnnotations />
    </MapContainer>
  )
}

export default MapViewer

const MapAnnotations = () => {
  const map = useMap();
  const {address} = useContext(AddressContext);
  const {streetCrimes} = useContext(StreetCrimesContext);

  useEffect(() => {
    const polygon = coordinateConversionService.getBoundingSquareLatLonPolygon(position, 1000);
    map.fitBounds(polygon);
  }, [address])

  const position = addressToPosition(address);

  const pathOptions = { color: '#ff005544' };
  const polygon: [number, number][] = coordinateConversionService
    .getBoundingSquareLatLonPolygon(position, 1000);
  
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={pathOptions} positions={polygon} />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  )
}

const addressToPosition = (address: string) => address.split(',').map(x => parseFloat(x.trim())) as [number, number];