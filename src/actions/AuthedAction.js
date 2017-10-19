import * as types from '../constants/auth';
import { getExtra, userInfo, info } from '../utils/api';
import transform from '../utils/img';

const isLogin = (login, userId) => ({
  type: types.IS_LOGIN,
  login,
  userId
});

export const fetchUserIsLogin = () => dispatch => {
  info().then(
    res =>
      res === 0 ? dispatch(isLogin(false, res)) : dispatch(isLogin(true, res))
  );
};

const receiveUser = userDetail => ({
  type: types.RECEIVE_USER,
  userDetail
});

export const fetchUser = id => dispatch => {
  userInfo(id).then(res => dispatch(receiveUser(res)));
};

const receiveExtra = extra => ({
  type: types.RECEIVE_EXTRA,
  extra
});
export const fetchExtra = id => dispatch => {
  getExtra(id).then(res => dispatch(receiveExtra(res)));
};

const changeImage = image => ({
  type: types.CHANGE_IMAGE,
  image
});

export const fetchImage = data => (dispatch, getState) => {
  const { authed: { userId } } = getState();
  const file = new FormData();
  file.append('file', data);
  fetch(`/eus/v1/users/${userId}/avatar`, {
    credentials: 'include',
    body: file,
    method: 'POST'
  })
    .then(res => res.json())
    .then(json => {™
      dispatch(changeImage(transform(json)));
    });
};
