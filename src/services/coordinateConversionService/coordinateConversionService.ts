import { Coordinate } from "../../models/Coordinate";

const latMeanToMetrePerLatLon = (latMean: number) : {mPerLat: number, mPerLon: number} => {
  const latMeanRadians = latMean * Math.PI / 180;
  const mPerLat = 111132.92 - 559.82*Math.cos(2*latMeanRadians) + 1.175*Math.cos(4*latMeanRadians) - 0.0023*Math.cos(6*latMeanRadians);
  const mPerLon = 111412.84*Math.cos(latMeanRadians) - 93.5*Math.cos(3*latMeanRadians) + 0.118*Math.cos(5*latMeanRadians);

  return {mPerLat: mPerLat, mPerLon: mPerLon};
}

const getBoundingSquareLatLonPolygon = (coordinate: Coordinate, squareLengthMetres: number) : Coordinate[] => {
  const {mPerLat, mPerLon} = latMeanToMetrePerLatLon(coordinate.lat);

  const latMax = coordinate.lat + squareLengthMetres / 2 / mPerLat;
  const latMin = coordinate.lat - squareLengthMetres / 2 / mPerLat;
  const lonMax = coordinate.lon + squareLengthMetres / 2 / mPerLon;
  const lonMin = coordinate.lon - squareLengthMetres / 2 / mPerLon;

  return [
    {lat: latMax, lon: lonMin},
    {lat: latMax, lon: lonMax},
    {lat: latMin, lon: lonMax},
    {lat: latMin, lon: lonMin},
  ]
}

export class CoordinateConversionService {
  getBoundingSquareLatLonPolygon = getBoundingSquareLatLonPolygon
}