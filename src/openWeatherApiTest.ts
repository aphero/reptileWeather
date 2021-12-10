import axios, { AxiosResponse } from 'axios';
import { CRESTED_GECKO, JUNGLE_CARPET_PYTHON, RED_EYED_CROCODILE_SKINK, VEILED_CHAMELEON } from './constants/reptiles';
import { Fauna, Species } from './data/species';
import { Location } from './constants/locations'

const API_KEY = '9c617ed451792d52672439874f22862a' as const
const UNIT = 'imperial'

const MissKeter = new Fauna('Miss Keter', CRESTED_GECKO)
const Clamps = new Fauna('Francis Clampazzo', VEILED_CHAMELEON)
const Kalira = new Fauna('Kalira', JUNGLE_CARPET_PYTHON)
const TickTock = new Fauna('Tick Tock', RED_EYED_CROCODILE_SKINK)

export async function getLocalWeather(location: Location) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

  const query = `${baseUrl}${addQueryCoords(location)}&units=${UNIT}&appid=${API_KEY}`

  console.log('Using query with openWeather API:', query)
  let maybeRes: AxiosResponse = await axios.get(query).catch(e => {throw new Error(`ERROR: ${e}`)})
  const weatherData = await coerceWeatherData(maybeRes)
  
  return weatherData
}

function addQueryCoords(location: Location) {
  return `lat=${location.lat}&lon=${location.lon}`
}

interface ReptileWeather {
  temp: number | string,
  humidity: number | string
}

async function coerceWeatherData(data: any): Promise<ReptileWeather> {
  console.log('Coercing data from API')
  if (data instanceof Error) {
    console.log('ERROR DETECTED')
    return {
      temp: 'ERROR',
      humidity: 'ERROR'
    }
  } else {
    console.log('Returning data')
    try {
      return {
        temp: data.data.main.temp,
        humidity: data.data.main.humidity
      }
    } catch(e) {
      console.log(e)
      return {
        temp: 'ERROR',
        humidity: 'ERROR'
      }
    }
  }
}

interface ReptileData {
  name: string
  weather: ReptileWeather
}

const reptileList = [MissKeter, Clamps, TickTock, Kalira]

async function main() {
  let reptiles: ReptileData[] = []
  for (let reptile of reptileList) {
    reptiles.push({name: reptile.name, weather: await reptile.fetchLocalWeather()})
  }
  console.log(JSON.stringify(reptiles, null, 2))
}

main()