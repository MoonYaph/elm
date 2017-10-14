import { combineReducers } from 'redux';
import home from './home'
import authed from './authed'
import food from './food'
// export  combineReducers({ currentCity });
export const makeRootReducer = asyncReducers => combineReducers({
  home,
  authed,
  food,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
