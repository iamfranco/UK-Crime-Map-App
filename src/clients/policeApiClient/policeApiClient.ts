import { CrimeCategory } from "./models/CrimeCategory";
import { StreetCrime } from "./models/StreetCrime";

const getStreetCrimes = async (polygon: [number, number][], date: string) : Promise<StreetCrime[]>  => {
  const poly = polygon.map(p => `${p[0]},${p[1]}`).join(':');
  const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${poly}&date=${date}`;

  let response = await fetch(url);
  return response.json() as Promise<StreetCrime[]>;
}

const getCrimeCategories = async () : Promise<CrimeCategory[]> => {
  const url = `https://data.police.uk/api/crime-categories`;

  let response = await fetch(url);
  return response.json() as Promise<CrimeCategory[]>;
}

export class PoliceApiClient {
  getStreetCrimes: (polygon: [number, number][], date: string) => Promise<StreetCrime[]> = getStreetCrimes
  getCrimeCategories: () => Promise<CrimeCategory[]> = getCrimeCategories
}