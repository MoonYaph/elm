import * as types from '../constants/discover'

const initialState = {
  list: [],
  hot: [],
  like: [],
  gift: [],
  offset: 0,
  limit: 3,
}
const discover = (state = initialState, action) => {
  switch (action.type) {

    case types.ENTRY:
      return Object.assign({}, state, {
        list: action.list
      })
    case types.HOT:
      return Object.assign({}, state, {
        hot: action.hot,
      })
    case types.ULIKE:
      return Object.assign({}, state, {
        like: action.like,
      })
    case types.GIFT:
      return Object.assign({}, state, {
        gift: action.gift,
      })
    default:
      return state
  }
}
export default discover
