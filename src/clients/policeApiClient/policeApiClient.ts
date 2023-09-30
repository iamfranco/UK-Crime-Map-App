import { Coordinate } from "../../models/Coordinate";
import { CrimeCategory } from "./models/CrimeCategory";
import { StreetCrime } from "./models/StreetCrime";

const getStreetCrimes = async (polygon: Coordinate[], date: string) : Promise<StreetCrime[]>  => {
  const poly = polygon.map(p => `${p.lat},${p.lon}`).join(':');
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
  getStreetCrimes: (polygon: Coordinate[], date: string) => Promise<StreetCrime[]> = getStreetCrimes
  getCrimeCategories: () => Promise<CrimeCategory[]> = getCrimeCategories
}