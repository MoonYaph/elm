import * as types from '../constants/home'

const initialState = {
  latitude: '',
  longitude: '',
  address: '',
  name: '',
  offset: 0,
  data: [],
  isFetching: false,
  list: []
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
        longitude: action.longitude,
        offset: 0
      })
    case types.FETCH_CAROUSEL:
      return Object.assign({}, state, {
        list: action.list
      })
    case types.REQUEST_RESTAURANT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      })
    case types.RECEIVE_RESTAURANT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        data: action.data
      })
    case types.FETCH_MORE_REATAURENT:
      return Object.assign({}, state, {
        isFetching: true,
        offset: action.offset
      })
    case types.RECEIVE_MORE_RESTAURANT:
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data, ...action.data],
      })
    default:
      return state
  }
}

