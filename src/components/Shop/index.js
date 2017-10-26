import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  shopDetail,
  fetchShop,
  fetchMenu,
  fetchScore,
  fetchTags,
  fetchComments
} from '../../actions/ShopAction';
import ShopNav from './ShopNav';
import ShopMenu from './ShopMenu';
import './index.scss';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  shop: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    name: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired
  }).isRequired
};
class Shop extends Component {
  componentWillMount() {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { id, latitude, longitude } = query;
    dispatch(shopDetail(id, latitude, longitude));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, shop: { id } } = this.props;
    if (id !== nextProps.shop.id) {
      dispatch(
        fetchShop(
          nextProps.shop.id,
          nextProps.shop.latitude,
          nextProps.shop.longitude
        )
      );
      dispatch(fetchMenu(nextProps.shop.id));
      dispatch(fetchScore(nextProps.shop.id));
      dispatch(fetchTags(nextProps.shop.id));
      dispatch(
        fetchComments(
          nextProps.shop.id,
          nextProps.shop.offset,
          nextProps.shop.name
        )
      );
    }
  }

  render() {
    return (
      <div style={{ overflow: 'auto', height: '100vh', overflowY: 'auto' }}>
        <ShopNav {...this.props} /> <ShopMenu {...this.props} />{' '}
      </div>
    );
  }
}
Shop.propTypes = propTypes;
export default Shop;
