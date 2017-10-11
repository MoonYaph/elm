import { combineReducers } from 'redux';
import home from './home.js'
// export  combineReducers({ currentCity });
export const makeRootReducer = asyncReducers => combineReducers({
  home,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
