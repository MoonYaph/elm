import * as types from '../constants/food';
import { shopList,
  foodCategory,
  foodActivity,
  foodType,
  foodCost,
  foodDelivery } from '../utils/api';
 /* eslint-disabled */
const requestFoodPre = (restaurant_category_ids, latitude, longitude) => ({
  type: types.REQUEST_FOOD,
  restaurant_category_ids,
  latitude,
  longitude
})

const receiveFoodPre = (list) => ({
  type: types.RECEIVE_FOOD,
  list
})

export const requestFood = (data, latitude, longitude) => dispatch => {
  dispatch(requestFoodPre(data, latitude, longitude))
}

export const receiveFood = () => (dispatch, getState) => {
  const { food } = getState()
  const  {
    latitude,
    longitude,
    offset,
    restaurant_category_ids,
    order_by,
    delivery_mode,
    support_ids,
    average_cost_ids,
    activity_types
  } = food
  console.info(food)
  shopList(latitude,
    longitude,
    offset,
    order_by,
    restaurant_category_ids,

    delivery_mode,
    support_ids,
    average_cost_ids,
    activity_types).then(res => dispatch(receiveFoodPre(res)))
}

function loadMore(n) {
  return {
    type: types.REQUEST_MORE,
    offset: n + 20
  };
}
function receiveMoreFood(list) {
  return {
    type: types.RECEIVE_MORE,
    list
  };
}
export function loadMoreData() {
  return (dispatch, getState) => {
    const { food } = getState();
    dispatch(loadMore(food.offset));
  };
}
export function receiveMore() {
  return (dispatch, getState) => {
    const { food } = getState();
    const {
      latitude,
      longitude,
      offset,
      restaurant_category_ids,
      order_by,
      delivery_mode,
      support_ids,
      average_cost_ids
    } = food;
    shopList(
      latitude,
      longitude,
      offset,
      order_by,
      restaurant_category_ids,
      delivery_mode,
      support_ids,
      average_cost_ids
    ).then(res => {
      dispatch(receiveMoreFood(res));
    });
  };
}

function requestCategory() {
  return {
    type: types.REQUEST_CATEGORY
  };
}
function receiveCategoryData(list) {
  return {
    type: types.RECEIVE_CATEGORY,
    list
  };
}
export function receiveCategory() {
  return (dispatch, getState) => {
    dispatch(requestCategory());
    const { food } = getState();
    const { latitude, longitude } = food;
    foodCategory(latitude, longitude).then(res =>
      dispatch(receiveCategoryData(res))
    );
  };
}

export function changeId(id) {
  return {
    type: types.CHANGE_CATEGORY,
    id
  };
}

export function changeSort(id) {
  return {
    type: types.CHANGE_SORT,
    id
  };
}

function activity(list) {
  return {
    type: types.FOOD_ACTIVITY,
    list
  };
}
export function fetchFoodActivity() {
  return (dispatch, getState) => {
    const { food } = getState();
    const { latitude, longitude } = food;
    foodActivity(latitude, longitude).then(res => dispatch(activity(res)));
  };
}

function deliveryMode (list)  {
  return {
    type: types.FOOD_DELIVERY,
    list
  }
};

export const fetchFoodDelivery = () => (dispatch, getState) => {
  const { food } = getState();
  const { latitude, longitude } = food;
  foodDelivery(latitude, longitude).then(res => dispatch(deliveryMode(res)));
};

function activityType (list) {
  return {
    type: types.FOOD_ACTIVITY_TYPE,
    list
  }
}
export const fetchFoodActivityType = () => (dispatch, getState) => {
  const { food } = getState();
  const { latitude, longitude } = food;
  foodType(latitude, longitude).then(res => dispatch(activityType(res)));
};

function cost (list) {
  return {
    type: types.FOOD_COST,
    list
  }
}
export const fetchFoodCost = () => (dispatch, getState) => {
  const { food } = getState();
  const { latitude, longitude } = food;
  foodCost(latitude, longitude).then(res => dispatch(cost(res)));
};


export function sortFood ( delivery, averageCostIds, activityTypes, supportIds) {
  return {
    type: types.SORT_ALL_FOOD,
    activity_types: activityTypes,
    delivery_mode: delivery,
    support_ids: supportIds,
    average_cost_ids: averageCostIds
  }
}
