import * as types from '../constants/home';
import { cityGuess } from '../utils/api';
import { constructCurrentLocationUrl } from '../utils/url';

const getCity = (latitude, longitude) => ({
  type: types.GET_CITY_INFO,
  latitude,
  longitude
});

export const fetchCity = () => dispatch => {
  cityGuess().then(res => {
    dispatch(getCity(res.latitude, res.longitude));
  });
};

const saveLocation = (address, name) => ({
  type: types.SAVE_CITY_INFO,
  address,
  name
});
export const fetchCurrentLocation = () => (dispatch, getState) => {
  const { home } = getState();
  const { latitude, longitude } = home;
  fetch(constructCurrentLocationUrl(latitude, longitude))
    .then(res => res.json())
    .then(json => dispatch(saveLocation(json.address, json.name)));
};

const toggleLocation = (latitude, longitude, name, address) => ({
  type: types.SAVE_SEARCH_LOCATION,
  latitude,
  longitude,
  name,
  address
});

export const fetchSearchLocation = (latitude, longitude, name, address) => (dispatch) => {
  dispatch(toggleLocation(latitude, longitude, name, address))
}
