import { Circle, MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import { coordinateConversionService } from '../../IoC/serviceProvider';
import { useContext, useEffect } from 'react';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';
import { AddressContext } from '../../contexts/AddressProvider';
import './MapViewer.css'
import { StreetCrime } from '../../clients/policeApiClient/models/StreetCrime';

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

  let streetCrimesGroupedByLatLon: StreetCrime[][] = [];
  for (const s of streetCrimes) {
    const matchingIndex = streetCrimesGroupedByLatLon.findIndex(x => 
      x.length > 0 && 
      x[0].location.latitude == s.location.latitude && 
      x[0].location.longitude == s.location.longitude);

    if (matchingIndex == -1) {
      streetCrimesGroupedByLatLon.push([s]);
      continue;
    }

    streetCrimesGroupedByLatLon[matchingIndex].push(s);
  }

  const circles = streetCrimesGroupedByLatLon.map(x => {
    const circlesGroup = x.map((y) => {
      const lat = parseFloat(y.location.latitude);
      const lon = parseFloat(y.location.longitude);

      const position : [number, number] = [lat, lon]

      return (
        <Circle key={`${y.id}-${y.category}`} center={position} radius={10} />
      )
    })

    return circlesGroup;
  });
  
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
      {circles}
    </>
  )
}

const addressToPosition = (address: string) => address.split(',').map(x => parseFloat(x.trim())) as [number, number];