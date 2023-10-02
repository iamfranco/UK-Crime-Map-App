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

export const makeRandomNominatimPlaceDetail = () => ({
  place_id: Math.random(),
  licence: 'licence_' + Math.random(),
  lat: 'lat_' + Math.random(),
  lon: 'lon_' + Math.random(),
  place_rank: Math.random(),
  importance: Math.random(),
  name: 'licence_' + Math.random(),
  display_name: 'licence_' + Math.random(),
  address: {
    city: 'city_' + Math.random(),
    state_district: 'state_district_' + Math.random(),
    state: 'state_' + Math.random(),
    country: 'country_' + Math.random(),
  },
  boundingbox: [Math.random(), Math.random(), Math.random(), Math.random()] as [number, number, number, number]
})