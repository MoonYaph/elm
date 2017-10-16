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

export const fetchShop = (id, latitude, longitude) => (dispatch) => {
  dispatch(requestShopDetails())

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
export const fetchMenu = (id) => (dispatch) => {


  foodMenu(id).then(res => dispatch(receiveMenu(res)))
}

const receiveScore = (score) => ({
  type: types.RECEIVE_SCORE,
  score
})
export const fetchScore = (id) => (dispatch) => {

  fetch(constructScoreUrl(id)).then(res => res.json())
  .then(json => dispatch(receiveScore(json)))
}

const receiveTags = (tags) => ({
  type: types.RECEIVE_TAGS,
  tags
})

export const fetchTags = (id) => (dispatch) => {

  fetch(constructTagsUrl(id)).then(res => res.json())
  .then(json => dispatch(receiveTags(json)))
}

const receiveComment = (comments) => ({
  type: types.RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (id, offset = 0, name = '') => (dispatch) => {

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
