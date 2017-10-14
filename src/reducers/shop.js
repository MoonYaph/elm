import * as types from '../constants/shop'

const initialState = {
  id: '',
  latitude: '',
  longitude: '',
  list: [],
  isFetching: false,
  menu: [],
  score: null,
  tags: null,
  comments: [],
  offset: 0,
}
const shop = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_SHOP_DETAIL:
      return Object.assign({}, state, {
        id: action.id,
        latitude: action.latitude,
        longitude: action.longitude
      })
    case types.SAVE_SHOP_DETAILS:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: false
      })
    case types.REQUEST_SHOP_DETAILS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_MENU:
      return Object.assign({}, state, {
        menu: action.list
      })
    case types.RECEIVE_SCORE:
      return Object.assign({}, state, {
        score: action.score
      })
    case types.RECEIVE_TAGS:
      return Object.assign({}, state, {
        tags: action.tags
      })
    case types.RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        comments: action.comments
      })
    case types.REQUEST_MORE_COMMENT:
      return Object.assign({}, state, {
        isFetching: true,
        offset: action.offset
      })
    case types.RECEIVE_MORE_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        comments: [...state.comments, ...action.comments]
      })
    default:
      return state
  }
}

export default shop
