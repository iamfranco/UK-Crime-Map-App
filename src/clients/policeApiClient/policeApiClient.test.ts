import { describe, expect, it } from 'vitest';
import { PoliceApiClient } from './policeApiClient';

describe('PoliceApiClient', () => {
  const subject = new PoliceApiClient();

  it('getStreetCrimes', async () => {
    const poly: [number, number][] = [
      [52.268, 0.543], 
      [52.794, 0.238], 
      [52.130, 0.478]
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



