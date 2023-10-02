import { NominatimApiClient } from "../../clients/nominatimApiClient/nominatimApiClient";

const latMeanToMetrePerLatLon = (latMean: number) : {mPerLat: number, mPerLon: number} => {
  const latMeanRadians = latMean * Math.PI / 180;
  const mPerLat = 111132.92 - 559.82*Math.cos(2*latMeanRadians) + 1.175*Math.cos(4*latMeanRadians) - 0.0023*Math.cos(6*latMeanRadians);
  const mPerLon = 111412.84*Math.cos(latMeanRadians) - 93.5*Math.cos(3*latMeanRadians) + 0.118*Math.cos(5*latMeanRadians);

  return {mPerLat: mPerLat, mPerLon: mPerLon};
}

const getBoundingSquareLatLonPolygon = (coordinate: [number, number], squareLengthMetres: number) : [number, number][] => {
  const {mPerLat, mPerLon} = latMeanToMetrePerLatLon(coordinate[0]);

  const latMax = coordinate[0] + squareLengthMetres / 2 / mPerLat;
  const latMin = coordinate[0] - squareLengthMetres / 2 / mPerLat;
  const lonMax = coordinate[1] + squareLengthMetres / 2 / mPerLon;
  const lonMin = coordinate[1] - squareLengthMetres / 2 / mPerLon;

  return [
    [latMax, lonMin],
    [latMax, lonMax],
    [latMin, lonMax],
    [latMin, lonMin]
  ]
}

export class CoordinateConversionService {
  constructor(private nominatimApiClient: NominatimApiClient) {}

  latMeanToMetrePerLatLon = latMeanToMetrePerLatLon
  getBoundingSquareLatLonPolygon = getBoundingSquareLatLonPolygon
  
  getLatLonFromAddress = async (address: string) : Promise<[number, number] | null> => {
    const result = await this.nominatimApiClient.getPlaceDetail(address);

    if (result == null) return null;

    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    return [lat, lon];
  }
}