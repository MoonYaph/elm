import * as types from '../constants/discover'
import { cityGuess } from '../utils/api'
import {
  constructDiscoverUrl,
   constructHotUrl,
   constructSaleListUrl,
   constructGiftUrl
  } from '../utils/url'


const entry = (list) => ({
  type: types.ENTRY,
  list
})

export const fetchEntry = (latitude, longitude) => (dispatch) => {

  fetch(constructDiscoverUrl(latitude, longitude))
  .then(res => res.json())
  .then(json => {
    const arr = []
    Object.keys(json).forEach((item) => {
      arr.push(json[item])
    })
    dispatch(entry(arr))
  })
}

const hots = (hot) => ({
  type: types.HOT,
  hot,
})

export function fetchHot (latitude, longitude) {
  return (dispatch, getState) => {
    const { discover } = getState()
    const { offset, limit } = discover
    fetch(constructHotUrl(latitude, longitude, offset, limit)).then(res => res.json())
    .then(json => {
      dispatch(hots(json))
    })
  }
}
const ulike = (like) => ({
  type: types.ULIKE,
  like
})

export const fetchLike = (latitude, longitude) => (dispatch, getState) => {
  const { discover } = getState()
  const {  offset, limit } = discover
  fetch(constructSaleListUrl(latitude, longitude, offset, limit)).then(res => res.json())
    .then(json => {
      const { query_list } = json
      dispatch(ulike(query_list))
    })
}
const gifts = (gift) => ({
  type: types.GIFT,
  gift
})
export const fetchGift = () => (dispatch) => {
  fetch(constructGiftUrl()).then(res => res.json())
  .then(json => dispatch(gifts(json)))
}

export const fetchCity = () => (dispatch) => cityGuess().then(res => {
  const { latitude, longitude } = res
  dispatch(fetchEntry(latitude, longitude))
  dispatch(fetchHot(latitude, longitude))
  dispatch(fetchLike(latitude, longitude))
  dispatch(fetchGift())
})
