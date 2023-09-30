import { describe, expect, it } from "vitest"
import { CoordinateConversionService } from "./coordinateConversionService"
import { Coordinate } from "../../models/Coordinate";

describe('CoordinateConversionService', () => {
  const subject = new CoordinateConversionService();

  it('getBoundingSquareLatLonPolygon returns correct coordinate polygon', () => {
    const coordinate: Coordinate = {lat: 0, lon: 0};
    const squareLengthMetres = 10;

    const result = subject.getBoundingSquareLatLonPolygon(coordinate, squareLengthMetres);

    expect(result.length).toBe(4);
    expect(result).toStrictEqual([
      {
        "lat": 0.00004521847512907042,
        "lon": -0.00004491577743757969,
      },
      {
        "lat": 0.00004521847512907042,
        "lon": 0.00004491577743757969,
      },
      {
        "lat": -0.00004521847512907042,
        "lon": 0.00004491577743757969,
      },
      {
        "lat": -0.00004521847512907042,
        "lon": -0.00004491577743757969,
      },
    ]);
  })
})