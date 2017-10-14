import * as types from '../constants/shop'
import { shopDetails, foodMenu, getRatingList } from '../utils/api'
import { constructScoreUrl, constructTagsUrl } from '../utils/url'

function saveShopDetail (id, latitude, longitude) {
  return {
    type: types.SAVE_SHOP_DETAIL,
    id,
    latitude,
    longitude,
  }
}

function saveShopDetails (list) {
  return {
    type: types.SAVE_SHOP_DETAILS,
    list
  }
}
function requestShopDetails () {
  return {
    type: types.REQUEST_SHOP_DETAILS,
  }
}
export const shopDetail = (id, latitude, longitude) =>
  (dispatch) => dispatch(saveShopDetail(id, latitude, longitude))

export const fetchShop = () => (dispatch, getState) => {
  dispatch(requestShopDetails())
  const { shop } = getState()
  const { id, latitude, longitude } = shop
  shopDetails(id, latitude, longitude).then(res => {
    dispatch(saveShopDetails(res))
  })
}
function receiveMenu (list) {
  return {
    type: types.RECEIVE_MENU,
    list
  }
}
export const fetchMenu = () => (dispatch, getState) => {
  const { shop } = getState()
  const { id } = shop
  foodMenu(id).then(res => dispatch(receiveMenu(res)))
}

const receiveScore = (score) => ({
  type: types.RECEIVE_SCORE,
  score
})
export const fetchScore = () => (dispatch, getState) => {
  const { shop } = getState()
  const { id } = shop
  fetch(constructScoreUrl(id)).then(res => res.json())
  .then(json => dispatch(receiveScore(json)))
}

const receiveTags = (tags) => ({
  type: types.RECEIVE_TAGS,
  tags
})

export const fetchTags = () => (dispatch, getState) => {
  const { shop } = getState()
  const { id } = shop
  fetch(constructTagsUrl(id)).then(res => res.json())
  .then(json => dispatch(receiveTags(json)))
}

const receiveComment = (comments) => ({
  type: types.RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (offset = 0, name = '') => (dispatch, getState) => {
  const { shop } = getState()
  const { id } = shop
  getRatingList(id, offset, name).then(res => dispatch(receiveComment(res)))
}

const requestMoreComment = (offset) => ({
  type: types.REQUEST_MORE_COMMENT,
  offset,
})
const receiveMoreComment = (comments) => ({
  type: types.RECEIVE_MORE_COMMENT,
  comments
})
export const fetchMore = () => (dispatch, getState) => {
  const { shop } = getState()
  const { offset } = shop
  dispatch(requestMoreComment(offset + 10))
}
export const fetchMoreComments = (name = '') => (dispatch, getState) => {
  const { shop } = getState()
  const { id, offset } = shop
  getRatingList(id, offset, name).then(res => dispatch(receiveMoreComment(res)))
}
