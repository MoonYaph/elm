import * as types from '../constants/home'

const initialState = {
 city: ''
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.CITY:
     return Object.assign({}, state, {
      city: action.city
     })
    default:
      return state
  }
}
