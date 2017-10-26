import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class OrderList extends Component {
  static propTypes = {
    authed: PropTypes.shape({
      order: PropTypes.array,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };
  renderOrder = (order) => {
    if (order.length) {
      return order.map((item) => <p>{item}</p>)
    }
    return <div>近三个月无订单记录</div>
  }
  render() {
    const { authed: { login, order }, location: { pathname } } = this.props;

    return (
      <div className='order-section'>{login ? (<div>{this.renderOrder(order)}</div>) : (
          <Link className='order-button' to={pathname ? `/signin?redirect=${encodeURIComponent(pathname)}`: '/'}>
            登录
          </Link>
        )}
      </div>
    );
  }
}
