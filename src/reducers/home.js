import * as types from '../constants/home'

const initialState = {
  latitude: '',
  longitude: '',
  address: '',
  name: ''
}
export default (state = initialState, action) => {
  switch (action.type) {
   case types.GET_CITY_INFO:
    return Object.assign({}, state, {
      latitude: action.latitude,
      longitude: action.longitude
    })
   case types.SAVE_CITY_INFO:
    return Object.assign({}, state, {
      address: action.address,
      name: action.name
    })
    case types.SAVE_SEARCH_LOCATION:
      return Object.assign({}, state, {
        address: action.address,
        name: action.name,
        latitude: action.latitude,
        longitude: action.longitude
      })
    default:
      return state
  }
}

