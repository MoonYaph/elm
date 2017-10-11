import * as types from '../constants/home'

export default function city(city) {
  return {
    type: types.CITY,
    city
  }
}
