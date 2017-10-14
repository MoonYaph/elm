import * as types from '../constants/home';
import { cityGuess } from '../utils/api';
import {
  constructCurrentLocationUrl,
  constructCarouselUrl,
  constructShopUrl
 } from '../utils/url';

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

const carousel = (list) => ({
  type: types.FETCH_CAROUSEL,
  list
})

export const fetchCarousel = () => (dispatch, getState) => {
  const { home } = getState()
  const { latitude, longitude } = home;
  fetch(constructCarouselUrl(latitude, longitude))
    .then(res => res.json())
    .then(json => {

      dispatch(carousel(json[0].entries))
    })
}

const requestRestaurant = (isFetching) => ({
  type: types.REQUEST_RESTAURANT,
  isFetching
})
const receiveRestaurant = (data, isFetching) => ({
  type: types.RECEIVE_RESTAURANT,
  data,
  isFetching
})

export const fetchRestaurant = () => (dispatch, getState) => {
  const { home } = getState()
  const { latitude, longitude, offset } = home;
  dispatch(requestRestaurant(true))
  fetch(constructShopUrl(latitude, longitude, offset))
    .then(res => res.json())
    .then(json => dispatch(receiveRestaurant(json, false)))
}
const requestMore = (offset) => ({
  type: types.FETCH_MORE_REATAURENT,
  offset
})
const receiveMore = (data) => ({
  type: types.RECEIVE_MORE_RESTAURANT,
  data
})
export const fetchMoreRestaurant = () => (dispatch, getState) => {
  const { home } = getState()
  const { latitude, longitude, offset } = home;
  dispatch(requestRestaurant(true))
  dispatch(requestMore(offset + 20))
  fetch(constructShopUrl(latitude, longitude, offset))
    .then(res => res.json())
    .then(json => dispatch(receiveMore(json)))
}

