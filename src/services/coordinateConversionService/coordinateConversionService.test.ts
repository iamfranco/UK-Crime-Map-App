import { describe, expect, it } from "vitest"
import { CoordinateConversionService } from "./coordinateConversionService"

describe('CoordinateConversionService', () => {
  const subject = new CoordinateConversionService();

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
})