import * as types from '../constants/auth';
import {
  getExtra,
  userInfo,
  info,
  packet,
  hongbao,
  refer,
  coupons,
  order
} from '../utils/api';
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

export const fetchUser = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  userInfo(userId).then(res => dispatch(receiveUser(res)));
};

const receiveExtra = extra => ({
  type: types.RECEIVE_EXTRA,
  extra
});
export const fetchExtra = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  getExtra(userId).then(res => dispatch(receiveExtra(res)));
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
    .then(json => {
      dispatch(changeImage(transform(json)));
    });
};

const requestPacket = count => ({
  type: types.REQUEST_PACKET,
  count
});

export const fetchPacket = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  packet(userId).then(res => dispatch(requestPacket(res)));
};

const requestHongbao = hongbaos => ({
  type: types.REQUEST_HONGBAO,
  hongbaos
});

export const fetchHongbao = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  hongbao(userId).then(res => dispatch(requestHongbao(res)));
};

const requestNewRefer = data => ({
  type: types.NEW_REFER,
  data
});

export const fetchNewRefer = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  refer(userId).then(res => dispatch(requestNewRefer(res)));
};

const requestCoupons = coupon => ({
  type: types.REQUEST_COUPONS,
  coupons: coupon
});

export const fetchCoupons = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  coupons(userId).then(res => dispatch(requestCoupons(res)));
};

const requestOrder = orderlist => ({
  type: types.REQUEST_ORDER,
  orderlist
});

export const fetchOrder = () => (dispatch, getState) => {
  const { authed } = getState();
  const { userId } = authed;
  order(userId).then(res => dispatch(requestOrder(res)));
};
