import * as types from '../constants/auth';

const initialState ={
  isLogin: false,

  user: {},
}

const authed = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.isLogin,

        user: action.user
      })
    default:
      return state
  }
}
export default authed
