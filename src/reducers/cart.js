const cart = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CART':
      let { restaurant_id, category_id, item_id, name, specfoods } = action.res;
      let cart = state || {};
      let restaurant = cart[restaurant_id] || {};
      let item = restaurant[item_id] || {};
      if (item.num) {
        item.num++;
      } else {
        item = {
          num: 1,
          price: specfoods[0].price,
          name,
          item_id,
          category_id,
          list: action.res
        };
        restaurant[item_id] = item;
        cart[restaurant_id] = restaurant;
      }
      return cart;
    case 'REMOVE_CART':
      const data = action.res;
      var cart = state;
      var { restaurant_id, item_id } = data;
      var restaurant = cart[restaurant_id] || {};
      var item = restaurant[item_id] || {};
      if (item.num > 1) {
        item.num--;
      } else {
        delete restaurant[item_id];
      }
      return cart;
    case 'EMPTY_CART':
      return {};
    default:
      return state;
  }
};
export default cart;
