import { StreetCrime } from "../../clients/policeApiClient/models/StreetCrime";
import { PoliceApiClient } from "../../clients/policeApiClient/policeApiClient";
import { CoordinateConversionService } from "../coordinateConversionService/coordinateConversionService";

export class PoliceApiService {
  constructor(
    private policeApiClient: PoliceApiClient, 
    private coordinateConversionService: CoordinateConversionService) {}

  async getStreetCrimesAroundCoordinate(coordinate: [number, number], squareLengthMetres: number, dates: string[]): Promise<StreetCrime[]> {
    const polygon = this.coordinateConversionService.getBoundingSquareLatLonPolygon(coordinate, squareLengthMetres);

    const apiCalls = dates.map(date => {
      return this.policeApiClient.getStreetCrimes(polygon, date);
    })

    const streetCrimes = await Promise.all(apiCalls);
    return streetCrimes.flat();
  }
}