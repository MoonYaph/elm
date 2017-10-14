import { combineReducers } from 'redux';
import home from './home'
import authed from './authed'
import food from './food'
import shop from './shop'
import cart from './cart'
import discover from './discover'
// export  combineReducers({ currentCity });
export const makeRootReducer = asyncReducers => combineReducers({
  home,
  authed,
  food,
  shop,
  cart,
  discover,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
