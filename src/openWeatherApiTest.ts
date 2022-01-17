import axios, { AxiosResponse } from 'axios';
import { BAD_TEST_HERP, CRESTED_GECKO, JUNGLE_CARPET_PYTHON, RED_EYED_CROCODILE_SKINK, VEILED_CHAMELEON } from './constants/reptiles';
import { Fauna, Species } from './data/species';
import { Location } from './constants/locations'

const API_KEY = '9c617ed451792d52672439874f22862a' as const
const UNIT = 'imperial'

const MissKeter = new Fauna('Miss Keter', CRESTED_GECKO)
const Clamps = new Fauna('Francis Clampazzo', VEILED_CHAMELEON)
const Kalira = new Fauna('Kalira', JUNGLE_CARPET_PYTHON)
const TickTock = new Fauna('Tick Tock', RED_EYED_CROCODILE_SKINK)
const BadTestHerp = new Fauna('Dumb Dumb', BAD_TEST_HERP)

export async function getLocalWeather(location: Location) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

  const query = `${baseUrl}${addQueryCoords(location)}&units=${UNIT}&appid=${API_KEY}`

  console.log('Using query with openWeather API:', query)
  let maybeRes: AxiosResponse | null = await axios.get(query)
  console.log(maybeRes?.data)
  const weatherData = await coerceWeatherData(maybeRes?.data)
  
  return weatherData
}

function addQueryCoords(location: Location) {
  return `lat=${location.lat}&lon=${location.lon}`
}

interface ReptileWeather {
  temp: number | string,
  humidity: number | string,
  location: string,
  windspeed: number | string
  pressure: number | string
}

async function coerceWeatherData(data: any): Promise<ReptileWeather|Error> {
  if (!data) {
    console.log('coerceWeatherData> No data returned from openWeather API')
    return Error('No Data')
  } else {
    try {
      console.log('Returning data')
      return {
        temp: data.main.temp,
        humidity: data.main.humidity,
        location: `${data.name}, ${data.sys.country}`,
        windspeed: data.wind.speed,
        pressure: data.main.pressure
      }
    } catch(e) {
      console.log('ERROR:', e)
      return Error('ERROR: Could not parse data')
    }
  }
}

interface ReptileData {
  name: string
  weather: ReptileWeather | Error
}

const reptileList = [MissKeter, Clamps, TickTock, Kalira, BadTestHerp]

async function main() {
  let reptiles: ReptileData[] = []
  for (let reptile of reptileList) {
    reptiles.push({name: reptile.name, weather: await reptile.fetchLocalWeather()})
  }
  console.log(JSON.stringify(reptiles, null, 2))
}

main()