import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transfrom from '../../utils/img';

export default class DiscoverItemInfo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const { price } = data;
    const img = data.image_hash ? data.image_hash : data.image_path;
    const title = data.name ? data.name : data.title;
    const discount = data.discount_rate
      ? (10 * data.discount_rate).toFixed(1)
      : '';
    return (
      <div className="discover-activity-body">
        <img alt="" src={transfrom(img)} />
        <div className="body-title">{title}</div>
        {price && (
          <div className="body-price">
            <span>¥{price}</span>
            {data.original_price && <span>¥{data.original_price}</span>}
          </div>
        )}
        {data.points_required && (
          <div className="body-price">
            <span>{data.points_required}积分</span>
            {data.original_price > 0 && <span>{data.original_price}</span>}
          </div>
        )}
        {data.corner_marker && (
          <div className="body-corner">{data.corner_marker}</div>
        )}
        {discount && <div className="body-corner">{discount}折</div>}
      </div>
    );
  }
}
