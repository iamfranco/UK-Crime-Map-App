import { describe, expect, it, vi } from "vitest";
import { makeRandomStreetCrime } from "../../clients/policeApiClient/models/StreetCrime";
import { coordinateConversionService, policeApiClient, policeApiService } from "../../IoC/serviceProvider";

describe('PoliceApiService', () => {
  const subject = policeApiService;

  // it('getStreetCrimesAroundCoordinate calls policeApiClient.getStreetCrimes and returns results', async () => {
  //   //Arrange
  //   const coordinate : [number, number] = [0, 0];
  //   const squareLengthMetres = 100;
  //   const date = '2023-01';

  //   const polygon: [number, number][] = [1, 2, 3].map(() => [Math.random(), Math.random()]);
  //   const streetCrimes = [1, 2, 3, 4].map(() => makeRandomStreetCrime());
    
  //   const getBoundingSquareLatLonPolygonSpy = vi
  //     .spyOn(coordinateConversionService, 'getBoundingSquareLatLonPolygon')
  //     .mockReturnValue(polygon);

  //   const getStreetCrimesSpy = vi
  //     .spyOn(policeApiClient, 'getStreetCrimes')
  //     .mockReturnValue(Promise.resolve(streetCrimes));
    
  //   //Act
  //   const result = await subject.getStreetCrimesAroundCoordinate(coordinate, squareLengthMetres, date);

  //   //Assert
  //   expect(getBoundingSquareLatLonPolygonSpy).toHaveBeenCalledWith(coordinate, squareLengthMetres);
  //   expect(getStreetCrimesSpy).toHaveBeenCalledWith(polygon, date);

  //   expect(result).toBe(streetCrimes);
  // })

  it('getStreetCrimesAroundCoordinate with multiple dates calls getStreetCrimesAroundCoordinate multiple times', async () => {
    //Arrange
    const coordinate : [number, number] = [0, 0];
    const squareLengthMetres = 100;
    const dates = [
      '2023-01', 
      '2023-02', 
      '2023-03', 
      '2023-04', 
      '2023-05', 
      '2023-06'
    ];

    const polygon: [number, number][] = [1, 2, 3].map(() => [Math.random(), Math.random()]);
    const streetCrimes = dates.map(() => [1, 2, 3, 4].map(() => makeRandomStreetCrime()));
    
    const getBoundingSquareLatLonPolygonSpy = vi
      .spyOn(coordinateConversionService, 'getBoundingSquareLatLonPolygon')
      .mockReturnValue(polygon);

    const getStreetCrimesSpy = vi
      .spyOn(policeApiClient, 'getStreetCrimes');

    for (let i=0; i<dates.length; i++) {
      getStreetCrimesSpy.mockReturnValueOnce(Promise.resolve(streetCrimes[i]));
    }
    
    //Act
    const result = await subject.getStreetCrimesAroundCoordinate(coordinate, squareLengthMetres, dates);

    //Assert
    expect(result).toEqual(streetCrimes.flat());
    expect(getBoundingSquareLatLonPolygonSpy).toHaveBeenCalledWith(coordinate, squareLengthMetres);
    for (const date of dates) {
      expect(getStreetCrimesSpy).toHaveBeenCalledWith(polygon, date);
    }

  })
})