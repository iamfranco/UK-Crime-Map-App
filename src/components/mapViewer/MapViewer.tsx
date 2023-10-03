import { useContext, useEffect, useRef } from 'react';
import { AddressContext } from '../../contexts/AddressProvider';
import './MapViewer.css';
import * as maptalks from 'maptalks';
import { coordinateConversionService } from '../../IoC/serviceProvider';
import { StreetCrimesContext } from '../../contexts/StreetCrimesProvider';
import { StreetCrime } from '../../clients/policeApiClient/models/StreetCrime';

const MapViewer = () => {
  const {coordinate} = useContext(AddressContext);
  const {streetCrimes} = useContext(StreetCrimesContext);

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const position = [coordinate[1], coordinate[0]];

    const map = new maptalks.Map(mapRef.current!, {
      center: position,
      zoom: 15.5,
      pitch: 60,
      bearing: 40,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
        subdomains: ["a","b","c","d"],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    });

    let coordinateBoundary = coordinateConversionService.getBoundingSquareLatLonPolygon(coordinate, 1000);
    coordinateBoundary.push(coordinateBoundary[0]);

    const boundary = new maptalks.LineString(coordinateBoundary.map((x) => [x[1], x[0]]), {
      symbol: {
        'lineColor' : 'black',
        'lineWidth' : 1,
      }
    });

    const point = new maptalks.Marker(position);

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

    const buildingScaling = 1;
    const buildings = streetCrimesGroupedByLatLon.map(group => {
      const lat = parseFloat(group[0].location.latitude);
      const lon = parseFloat(group[0].location.longitude);
      const count = group.length;

      let coordinateBoundary = coordinateConversionService.getBoundingSquareLatLonPolygon([lat, lon], 10);
      coordinateBoundary.push(coordinateBoundary[0]);

      return new maptalks.LineString(coordinateBoundary.map((x) => [x[1], x[0]]), {
        symbol: {
          'lineColor' : 'red',
          'lineWidth' : 1,
          'polygonFill' : 'red',
        },
        properties : {
          'altitude' : coordinateBoundary.map(() => count * buildingScaling)
        }
      });
    })

    new maptalks.VectorLayer('vector', [point, ...buildings, boundary], { 
      enableAltitude : true, 
      drawAltitude : {
        polygonFill : 'red',
        polygonOpacity : 0.3,
      }
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [coordinate, streetCrimes]);

  return (
    <>
      <div ref={mapRef} id="map" className="container"></div>
    </>
  )
}

export default MapViewer