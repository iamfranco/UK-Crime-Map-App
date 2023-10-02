import { describe, expect, it, vi } from "vitest";
import { makeRandomStreetCrime } from "../../clients/policeApiClient/models/StreetCrime";
import { coordinateConversionService, policeApiClient, policeApiService } from "../../IoC/serviceProvider";

describe('PoliceApiService', () => {
  const subject = policeApiService;

  it('getStreetCrimesAroundCoordinate calls policeApiClient.getStreetCrimes and returns results', async () => {
    //Arrange
    const coordinate : [number, number] = [0, 0];
    const squareLengthMetres = 100;
    const date = '2023-01';

    const polygon: [number, number][] = [1, 2, 3].map(() => [Math.random(), Math.random()]);
    const streetCrimes = [1, 2, 3, 4].map(() => makeRandomStreetCrime());
    
    const getBoundingSquareLatLonPolygonSpy = vi
      .spyOn(coordinateConversionService, 'getBoundingSquareLatLonPolygon')
      .mockReturnValue(polygon);

    const getStreetCrimesSpy = vi
      .spyOn(policeApiClient, 'getStreetCrimes')
      .mockReturnValue(Promise.resolve(streetCrimes));
    
    //Act
    const result = await subject.getStreetCrimesAroundCoordinate(coordinate, squareLengthMetres, date);

    //Assert
    expect(getBoundingSquareLatLonPolygonSpy).toHaveBeenCalledWith(coordinate, squareLengthMetres);
    expect(getStreetCrimesSpy).toHaveBeenCalledWith(polygon, date);

    expect(result).toBe(streetCrimes);
  })
})