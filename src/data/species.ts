import { getLocalWeather } from '../openWeatherApiTest'
import { Location } from '../constants/locations'

export interface Species {
  commonName: string,
  binomialName: string
  location: Location
}

export class Fauna {
  name: string
  species: Species

  constructor(name: string, species: Species) {
    this.name = name
    this.species = species
  }

  async fetchLocalWeather() {
    console.log('Requesting local weather data from the class function')
    return await getLocalWeather(this.species.location)
  }
}