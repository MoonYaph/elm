import * as types from '../constants/auth';

const initialState ={
  login: false,
  extra: {},
  userId: 0,
  userInfo: {},
  image: ''
}

const authed = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return Object.assign({}, state, {
        login: action.login,
        userId: action.userId
      })
    case types.RECEIVE_USER:
      return {...state, userInfo: action.userDetail}
    case types.RECEIVE_EXTRA:
      return {...state, extra: action.extra}
    case types.CHANGE_IMAGE:
      return {...state, image: action.image}
    default:
      return state
  }
}
export default authed
