import { describe, expect, it, vi } from "vitest";
import { Coordinate, makeRandomCoordinate } from "../../models/Coordinate";
import { PoliceApiService } from "./policeApiService";
import { PoliceApiClient } from "../../clients/policeApiClient/policeApiClient";
import { CoordinateConversionService } from "../coordinateConversionService/coordinateConversionService";
import { makeRandomStreetCrime } from "../../clients/policeApiClient/models/StreetCrime";

describe('PoliceApiService', () => {
  const policeApiClient = new PoliceApiClient();
  const coordinateConversionService = new CoordinateConversionService();
  const subject = new PoliceApiService(policeApiClient, coordinateConversionService);

  it('getStreetCrimesAroundCoordinate calls policeApiClient.getStreetCrimes and returns results', async () => {
    //Arrange
    const coordinate : Coordinate = {lat: 0, lon: 0};
    const squareLengthMetres = 100;
    const date = '2023-01';

    const polygon = [1, 2, 3].map(() => makeRandomCoordinate());
    const streetCrimes = [1, 2, 3, 4].map(() => makeRandomStreetCrime());
    
    const getBoundingSquareLatLonPolygonSpy = vi.spyOn(coordinateConversionService, 'getBoundingSquareLatLonPolygon');
    const getStreetCrimesSpy = vi.spyOn(policeApiClient, 'getStreetCrimes');
    getBoundingSquareLatLonPolygonSpy.mockReturnValue(polygon);
    getStreetCrimesSpy.mockReturnValue(Promise.resolve(streetCrimes));
    
    //Act
    const result = await subject.getStreetCrimesAroundCoordinate(coordinate, squareLengthMetres, date);

    //Assert
    expect(getBoundingSquareLatLonPolygonSpy).toHaveBeenCalledWith(coordinate, squareLengthMetres);
    expect(getStreetCrimesSpy).toHaveBeenCalledWith(polygon, date);

    expect(result).toBe(streetCrimes);
  })
})