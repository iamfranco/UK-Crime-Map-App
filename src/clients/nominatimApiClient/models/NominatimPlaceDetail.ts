export interface NominatimPlaceDetail {
  place_id: number,
  licence: string,
  lat: string,
  lon: string,
  place_rank: number,
  importance: number,
  name: string,
  display_name: string,
  address: {
    city: string,
    state_district: string,
    state: string,
    country: string
  },
  boundingbox: [number, number, number, number]
}