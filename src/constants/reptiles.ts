import { Species } from "../data/species"
import { AUSTRALIA, NEW_CALEDONIA, NEW_GUINEA, YEMEN, INVALID_COUNTRY } from "./locations"

export const CRESTED_GECKO: Species = {
  commonName: 'Crested Gecko',
  binomialName: 'Correlophus ciliatus',
  location: NEW_CALEDONIA
}

export const VEILED_CHAMELEON: Species = {
  commonName: 'Veiled Chameleon',
  binomialName: 'Chamaeleo calyptratus',
  location: YEMEN
}

export const JUNGLE_CARPET_PYTHON: Species = {
  commonName: 'Jungle Carpet Python',
  binomialName: 'Morelia spilota cheynei',
  location: AUSTRALIA
}

export const RED_EYED_CROCODILE_SKINK: Species = {
  commonName: 'Red Eyed Crocodile Skink',
  binomialName: 'Tribolonotus Gracilus',
  location: NEW_GUINEA
}

export const BAD_TEST_HERP: Species = {
  commonName: 'Dumb Dumb',
  binomialName: 'Biggus dumbus',
  location: INVALID_COUNTRY
}