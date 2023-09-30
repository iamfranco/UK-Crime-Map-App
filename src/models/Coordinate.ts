export interface Coordinate {
  lat: number,
  lon: number
}

export const makeRandomCoordinate = () => ({
  lat: Math.random(),
  lon: Math.random()
})