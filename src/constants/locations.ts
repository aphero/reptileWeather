export interface Location {
  stationId: string,
  state?: string,
  postalCode?: number,
  lat: number,
  lon: number
}

export const MEBANE: Location = {
  stationId: '',
  state: 'NC',
  postalCode: 27302,
  lon: 36.096,
  lat: -79.267
}

export const NEW_CALEDONIA: Location = {
  stationId: 'ISOUTH1020',
  lat: -22.21,
  lon: 166.52,
}

export const YEMEN: Location = {
  stationId: 'Sanaa',
  lon: 44.206389,
  lat: 15.348333, 
}

export const AUSTRALIA: Location = {
  stationId: 'Ravenshoe',
  lon: 145.483,
  lat: -17.6058, 
}

export const NEW_GUINEA: Location = {
  stationId: 'IPORTM84',
  lat: -9.40,
  lon: 147.15
}