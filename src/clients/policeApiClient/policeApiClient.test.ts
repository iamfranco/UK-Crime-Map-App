import { describe, expect, it } from 'vitest'; 
import { Coordinate } from '../../models/Coordinate';
import { PoliceApiClient } from './policeApiClient';

describe('PoliceApiClient', () => {
  const subject = new PoliceApiClient();

  it('getStreetCrimes', async () => {
    const poly: Coordinate[] = [
      {lat: 52.268, lon: 0.543}, 
      {lat: 52.794, lon: 0.238}, 
      {lat: 52.130, lon: 0.478}
    ]
    const date = '2021-02';
    const result = await subject.getStreetCrimes(poly, date);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].month).toBe(date);
  })

  it('getCrimeCategories', async () => {
    const result = await subject.getCrimeCategories();
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].name).toBe('All crime');
  })
})



