import { Circle, MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import { circleGroupUtils, coordinateConversionService } from '../../IoC/serviceProvider';
import { useContext, useEffect } from 'react';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';
import { AddressContext } from '../../contexts/AddressProvider';
import './MapViewer.css'
import { StreetCrime } from '../../clients/policeApiClient/models/StreetCrime';
import { crimeTypeColor } from './styles/crimeTypeColor';

const MapViewer = () => {
  const {coordinate} = useContext(AddressContext);

  return (
    <MapContainer center={coordinate} zoom={16} scrollWheelZoom={true}>
      <MapAnnotations />
    </MapContainer>
  )
}

export default MapViewer

const MapAnnotations = () => {
  const map = useMap();
  const {coordinate} = useContext(AddressContext);
  const {streetCrimes} = useContext(StreetCrimesContext);

  useEffect(() => {
    const polygon = coordinateConversionService.getBoundingSquareLatLonPolygon(coordinate, 1000);
    map.fitBounds(polygon);
  }, [coordinate])

  const pathOptions = { color: '#ff005544' };
  const polygon: [number, number][] = coordinateConversionService
    .getBoundingSquareLatLonPolygon(coordinate, 1000);

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

  const dotRadius = 6;

  const circles = streetCrimesGroupedByLatLon.map(x => {
    const circlesGroup = x.map((y, index) => {
      const lat = parseFloat(y.location.latitude);
      const lon = parseFloat(y.location.longitude);
      const positionOffset = circleGroupUtils.dotIndex2DotPosition(index, dotRadius);
      const {mPerLat, mPerLon} = coordinateConversionService.latMeanToMetrePerLatLon(lat);

      const position : [number, number] = [lat + positionOffset[1] / mPerLat, lon + positionOffset[0] / mPerLon]
      const color = crimeTypeColor.find(c => c.itemArray.includes(y.category))?.color ?? '#000';

      return (
        <Circle 
          key={`${y.id}-${y.category}`} 
          center={position} 
          radius={dotRadius} 
          color={'#000'}
          weight={1}
          fillColor={color}
          fillOpacity={0.9} />
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
      <Marker position={coordinate}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {circles}
    </>
  )
}