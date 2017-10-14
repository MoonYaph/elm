import * as types from '../constants/auth';
import { constructUserUrl } from '../utils/url';

const requestUser = (isLogin, userId = '') => ({
  type: types.IS_LOGIN,
  isLogin,
  userId
})

export const fetchUser = () => (dispatch) => {
  fetch(constructUserUrl()).then(res => res.json())
    .then(json => {
     json === 0 ? dispatch(requestUser(false)) : dispatch(requestUser(true, json))
    })
}
