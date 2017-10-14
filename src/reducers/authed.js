import * as types from '../constants/auth';

const initialState ={
  isLogin: '',
  userId: '',
  validate: '',
  captcha: '',
  error: '',
  mobile: '',

}

const authed = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.isLogin,
        userId: action.userId
      })
    default:
      return state
  }
}
export default authed
