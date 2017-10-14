import * as types from '../constants/food'

const initialSate = {
  isFetching: false,
  list: [],
  offset: 0,
  restaurant_category_ids: [],
  order_by:'', // 排序
  categoryList: [],
  support_ids:[], // 商家属性
  delivery_mode: '', // 配送方式
  average_cost_ids: '',
  activity_types: '',

  activities: [], // 活动列表信息
  delivery: [], // 配送方式列表信息
  activitiesType: [], // 优惠活动列表信息
  cost: [] // 人均消费列表信息
}

export default function food (state = initialSate, action) {
  switch (action.type) {
    case types.REQUEST_FOOD:
      return Object.assign({}, state, {
        isFetching: true,
        restaurant_category_ids: action.restaurant_category_ids,
        latitude: action.latitude,
        longitude: action.longitude
      })
    case types.RECEIVE_FOOD:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.list
      })
    case types.REQUEST_MORE:
      return Object.assign({}, state, {
        offset: action.offset,
        isFetching: true
      })
    case types.RECEIVE_MORE:
      return Object.assign({}, state, {
        list: [...state.list, ...action.list],
        isFetching: false
      })
    case types.REQUEST_CATEGORY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_CATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        categoryList: action.list
      })
    case types.CHANGE_CATEGORY:
      return Object.assign({}, state, {
        restaurant_category_ids: [action.id]
      })
    case types.CHANGE_SORT:
      return Object.assign({}, state, {
        order_by: action.id
      })
    case types.FOOD_ACTIVITY:
      return Object.assign({}, state, {
        activities: action.list
      })
    case types.FOOD_DELIVERY:
      return Object.assign({}, state, {
        delivery: action.list
      })
    case types.FOOD_ACTIVITY_TYPE:
      return Object.assign({}, state, {
        activitiesType: action.list
      })
    case types.FOOD_COST:
      return Object.assign({}, state, {
        cost: action.list
      })
    case types.SORT_ALL_FOOD:
      return Object.assign({}, state, {
        delivery_mode: action.delivery_mode,
        activity_types: action.activity_types,
        support_ids: action.support_ids,
        average_cost_ids: action.average_cost_ids
      })
    default:
      return state
  }
}
