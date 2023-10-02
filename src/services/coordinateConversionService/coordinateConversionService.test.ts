import { describe, expect, it, vi } from "vitest"
import { coordinateConversionService, nominatimApiClient } from "../../IoC/serviceProvider";
import { makeRandomNominatimPlaceDetail } from "../../clients/nominatimApiClient/models/NominatimPlaceDetail";

describe('CoordinateConversionService', () => {
  const subject = coordinateConversionService;

  it('getBoundingSquareLatLonPolygon returns correct coordinate polygon', () => {
    const coordinate: [number, number] = [0, 0];
    const squareLengthMetres = 10;

    const result = subject.getBoundingSquareLatLonPolygon(coordinate, squareLengthMetres);

    expect(result.length).toBe(4);
    expect(result).toStrictEqual([
      [0.00004521847512907042, -0.00004491577743757969],
      [0.00004521847512907042, 0.00004491577743757969],
      [-0.00004521847512907042, 0.00004491577743757969],
      [-0.00004521847512907042, -0.00004491577743757969]
    ]);
  })

  it('given nominatimApiClient returns result, when getLatLonFromAddress, then returns lat lon', async () => {
    //Arrange
    const address = 'someAddress';
    const nominatimPlaceDetail = makeRandomNominatimPlaceDetail();

    const getPlaceDetailSpy = vi
      .spyOn(nominatimApiClient, 'getPlaceDetail')
      .mockReturnValue(Promise.resolve(nominatimPlaceDetail));

    //Act
    const result = await subject.getLatLonFromAddress(address);

    //Assert
    expect(result).not.toBeNull();
    if (result == null) return;

    expect(result[0]).toBe(parseFloat(nominatimPlaceDetail.lat));
    expect(result[1]).toBe(parseFloat(nominatimPlaceDetail.lon));

    expect(getPlaceDetailSpy).toHaveBeenCalledWith(address);
  })

  it('given nominatimApiClient returns null, when getLatLonFromAddress, then returns null', async () => {
    //Arrange
    const address = 'someAddress';
    const nominatimPlaceDetail = null;

    const getPlaceDetailSpy = vi
      .spyOn(nominatimApiClient, 'getPlaceDetail')
      .mockReturnValue(Promise.resolve(nominatimPlaceDetail));

    //Act
    const result = await subject.getLatLonFromAddress(address);

    //Assert
    expect(result).toBeNull();

    expect(getPlaceDetailSpy).toHaveBeenCalledWith(address);
  })
})