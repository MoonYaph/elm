import * as types from '../constants/auth';
import store from '../utils/store';
import { getExtra, userInfo } from '../utils/api';

const requestUser = (isLogin, user) => ({
  type: types.IS_LOGIN,
  isLogin,
  user
})

export const fetchUser = () => (dispatch) => {
  const user= store.get('user')

  if (user && user.user_id) {
    dispatch(requestUser(true, user))
  }
}

const requestId = (id) =>({
  type: types.REQUEST_USER,
  id
})
const receiveUser = (info) => ({
  type: types.RECEIVE_USER,
  info
})
export const fetchUserInfo = (id) => dispatch => {
  dispatch(requestId(id))
  userInfo(id).then(res => {
    console.info(res)
    dispatch(receiveUser(res))
  })
}
