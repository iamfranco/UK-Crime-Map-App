import { NominatimPlaceDetail } from "./models/NominatimPlaceDetail";

const getPlaceDetail = async (address: string) : Promise<NominatimPlaceDetail | null> =>  {
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=1`;

  const response = await fetch(url);
  const results = await (response.json() as Promise<NominatimPlaceDetail[]>);

  if (results.length == 0) return null;

  return results[0];
}

export class NominatimApiClient {
  getPlaceDetail = getPlaceDetail
} 