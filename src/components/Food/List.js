import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transform from '../../utils/img';
import Button from '../Button'
import Star from '../Star';

class FoodList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isHide: true,
    };
  }
  handleClick() {
    this.setState({
      isHide: !this.state.isHide
    });
  }


  renderSupports = type => {
    if (!type) {
      return null;
    }
    return type.map((item, index) => (
      <div key={index} className="support-item">
        {item.icon_name}
      </div>
    ));
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
    const { food } = this.props;
    const { list } = food;
    return (
      <div className='shoplist'>
        {list.map((item, index) => {
          const { distance } = item;
          const len =
            distance < 1000
              ? `${distance} m`
              : `${(distance / 1000).toFixed(1)} km`;
          const flag = item.is_premium ? 'flag' : '';
          return (
            <div key={index} className="shoplist-item">
              <div className="logo-container">
                <div className="shoplist-logo">
                  <img alt="" src={transform(item.image_path)} />
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
                    <Button classname='shoplist-length'
                      handleClick={this.handleClick}
                      text={`${item.activities.length}个活动`} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
FoodList.propTypes = {
  food: PropTypes.instanceOf(Object),
};
FoodList.defaultProps ={
  food: PropTypes.instanceOf(Object),
}
export default FoodList;
