import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import transform from '../../utils/img';
import Star from '../Star';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: true
    }
  }

  renderSupports = type => {
    if (type) {
      return type.map((item, index) => (
        <div key={index} className="support-item">
          {item.icon_name}
        </div>
      ));
    }
    return null;
  };
  renderActivities(type) {
    if (type) {
      return type.map((item, index) => {
        const hide = index > 1 && this.state.isHide ? ' hide' : '';
        const green = item.icon_name && item.icon_name === '首' ? 'green' : '';
        return (
          <div key={index} className={`shoplist-active${hide}`}>
            {item.icon_name && (
              <div className={`icons ${green}`}>{item.icon_name}</div>
            )}
            <div className="shoplist-description">{item.description}</div>
          </div>
        );
      });
    }
    return null;
  }
  render() {
    const { home } = this.props;
    const { data, latitude, longitude } = home;
    return (
      <div>
        {data.map((item, index) => {
          const { distance, id } = item;
          const len =
            distance < 1000
              ? `${distance} m`
              : `${(distance / 1000).toFixed(1)} km`;
          const flag = item.is_premium ? 'flag' : '';
          return (
            <Link
              key={index}
              className="shoplist-item"
              to={{ pathname: '/shop', query: { latitude, longitude, id } }}
            >
              <div className="logo-container">
                <div className="shoplist-logo">
                  <img alt={id} src={transform(item.image_path)} />
                </div>
              </div>
              <div className="shoplist-main">
                <div className="shoplist-line">
                  <h3 className={`shoplist-shopname ${flag}`}>
                    <span>{item.name}</span>
                  </h3>
                  <div className="shoplist-support">
                    {this.renderSupports(item.supports)}
                  </div>
                </div>
                <div className="shoplist-line">
                  <div className="shoplist-wrapper">
                    <Star rating={item.rating} />
                    <div className="shoplist-rating">{item.rating}</div>
                    <div>月销{item.recent_order_num}单</div>
                  </div>
                  {item.delivery_mode && (
                    <div className="shoplist-delivery">
                      {item.delivery_mode.text}
                    </div>
                  )}
                </div>
                <div className="shoplist-line ">
                  <div className="shoplist-price">
                    <div className="start-price">
                      ¥{item.float_minimum_order_amount}起送
                    </div>
                    <div className="shoplist-margin">|</div>
                    <div>配送费¥{item.float_delivery_fee}</div>
                  </div>
                  <div className="shoplist-distance">
                    <div>{len}</div>
                    <div className="shoplist-margin">|</div>
                    <div>{item.order_lead_time}分钟</div>
                  </div>
                </div>
                <div className="shoplist-activities">
                  <div className="actives">
                    {this.renderActivities(item.activities)}
                  </div>
                  {item.activities.length > 2 && (
                    <div
                      className="shoplist-length"
                      onKeyPress={this.handleClick}
                      onClick={this.handleClick}
                      role="button"
                      tabIndex={id}
                    >
                      {item.activities.length}个活动
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
List.propTypes = {
  home: PropTypes.instanceOf(Object)
};
List.defaultProps = {
  home: PropTypes.object.isRequired
};
export default List;
