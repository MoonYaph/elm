import * as types from '../constants/auth';
import store from '../utils/store';

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
