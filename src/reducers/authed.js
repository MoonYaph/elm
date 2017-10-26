import * as types from '../constants/auth';

const initialState = {
  login: false,
  extra: {},
  userId: 0,
  userInfo: {},
  image: '',
  count: '',
  hongbao: [],
  refer: 0,
  coupons: 0,
  order: []
};

const authed = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return { ...state, login: action.login, userId: action.userId };
    case types.RECEIVE_USER:
      return { ...state, userInfo: action.userDetail };
    case types.RECEIVE_EXTRA:
      return { ...state, extra: action.extra };
    case types.CHANGE_IMAGE:
      return { ...state, image: action.image };
    case types.REQUEST_PACKET:
      return { ...state, count: action.count };
    case types.REQUEST_HONGBAO:
      return { ...state, hongbao: action.hongbaos };
    case types.NEW_REFER:
      return { ...state, refer: action.data };
    case types.REQUEST_COUPONS:
      return { ...state, coupons: action.coupons };
    case types.REQUEST_ORDER:
      return { ...state, order: action.orderlist };
    default:
      return state;
  }
};
export default authed;
